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
 * Ensure `callback` is called every time window.location changes
 * Code derived from https://stackoverflow.com/questions/3522090/event-when-window-location-href-changes
 *
 * @export
 * @param {function} callback - function to be called when URL changes
 * @returns {MutationObserver} - MutationObserver that watches the URL
 */
export function addLocationChangeCallback(callback: () => void) {
  // Run the callback once right at the start
  window.setTimeout(callback, 0);

  // Set up a `MutationObserver` to watch for changes in the URL
  let oldHref = window.location.href;
  const observer = new MutationObserver((mutations) => {
    if (mutations.some(() => oldHref !== document.location.href)) {
      oldHref = document.location.href;
      callback();
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
  return observer;
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
