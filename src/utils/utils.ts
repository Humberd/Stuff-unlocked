const APP_NAME = "Stuff Unlocked";

/**
 * Wrapped console.log function.
 *
 * @export
 * @param {*} args
 */
export function log(...args: unknown[]) {
  console.log(`%c${APP_NAME}:`, "color: purple; font-weight: bold", ...args);
}

export function error(...args: unknown[]) {
  console.error(
    `%c${APP_NAME} [ERROR]:`,
    "color: red; font-weight: bold; border-bottom: 1px solid red;",
    ...args,
  );
}

/**
 * Calls `callback` right away and every time the page URL changes.
 * Changes of the hash alone are ignored: every click on a `href="#"` link
 * makes one, and the page stays the same.
 * Code derived from https://stackoverflow.com/questions/3522090/event-when-window-location-href-changes
 */
export function addLocationChangeCallback(callback: () => void) {
  window.setTimeout(callback, 0);

  let oldUrl = urlWithoutHash(document.location.href);
  const observer = new MutationObserver(() => {
    const url = urlWithoutHash(document.location.href);
    if (url !== oldUrl) {
      oldUrl = url;
      callback();
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
  return observer;
}

export function urlWithoutHash(url: string): string {
  return url.split("#")[0];
}

/** Normalizes a caught value, which can be anything, to an Error. */
export function toError(value: unknown): Error {
  return value instanceof Error ? value : new Error(String(value));
}

export function ensure<T>(thing: T | null | undefined, message?: string): T {
  if (thing === null || thing === undefined) {
    const msg = message ?? `Expected a value, got ${String(thing)}`;
    throw new Error(msg);
  }

  return thing;
}
