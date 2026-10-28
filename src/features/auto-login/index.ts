import { createFeature } from "../../utils/feature";
import { isTopWindow } from "../../utils/erep-global-info";
import { isSettingEnabled } from "../../settings/stuff-settings";

/** How long the browser gets to fill in the saved password. */
const AUTOFILL_TIMEOUT_MS = 3_000;
const AUTOFILL_POLL_MS = 200;
const MIN_CREDENTIAL_LENGTH = 3;
/** A failed login shows the form again, so it would try with the same password forever. */
const RETRY_AFTER_MS = 60_000;
const LAST_ATTEMPT_KEY = "suAutoLoginLastAttempt";

export const AutoLoginFeature = createFeature({
  id: "auto_login",
  name: "Auto Login",
  description:
    "Logs in on the login form once the browser has filled in the saved email and password.",
  canExecute: () => isTopWindow(),
  isSettingEnabled: () => isSettingEnabled("autoLogin"),
  execute: ({ onCleanup }) => {
    const form = document.querySelector("#login_form");
    if (!form || wasAttemptedRecently()) {
      return;
    }
    const remember = form.querySelector<HTMLInputElement>("#remember");
    if (remember) {
      remember.checked = true;
    }

    const startedAt = Date.now();
    const intervalId = window.setInterval(() => {
      if (areCredentialsFilled(form)) {
        window.clearInterval(intervalId);
        sessionStorage.setItem(LAST_ATTEMPT_KEY, String(Date.now()));
        form.querySelector<HTMLButtonElement>("button")?.click();
      } else if (Date.now() - startedAt > AUTOFILL_TIMEOUT_MS) {
        window.clearInterval(intervalId);
      }
    }, AUTOFILL_POLL_MS);
    onCleanup(() => window.clearInterval(intervalId));
  },
});

function areCredentialsFilled(form: Element): boolean {
  const [email, password] = form.querySelectorAll<HTMLInputElement>(
    "input[id^=citizen_]",
  );
  return (
    (email?.value.length ?? 0) >= MIN_CREDENTIAL_LENGTH &&
    (password?.value.length ?? 0) >= MIN_CREDENTIAL_LENGTH
  );
}

function wasAttemptedRecently(): boolean {
  const lastAttempt = Number(sessionStorage.getItem(LAST_ATTEMPT_KEY));
  return Date.now() - lastAttempt < RETRY_AFTER_MS;
}
