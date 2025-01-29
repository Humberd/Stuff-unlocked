const APP_NAME = "Stuff Unlocked";

/**
 * Wrapped console.log function.
 *
 * @export
 * @param {*} args
 */
export function log(...args: any[]) {
  console.log(`%c${APP_NAME}:`, "color: purple; font-weight: bold", ...args);
}

export function error(...args: any[]) {
  console.log(
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
export function addLocationChangeCallback(callback: any) {
  // Run the callback once right at the start
  window.setTimeout(callback, 0);

  // Set up a `MutationObserver` to watch for changes in the URL
  let oldHref = window.location.href;
  const body = document.querySelector("body");
  const observer = new MutationObserver((mutations) => {
    if (mutations.some(() => oldHref !== document.location.href)) {
      oldHref = document.location.href;
      callback();
    }
  });

  observer.observe(body as any, { childList: true, subtree: true });
  return observer;
}

/**
 * Awaits for an element with the specified `selector` to be found
 * and then returns the selected dom node.
 * This is used to delay rendering a widget until its parent appears.
 */
export async function awaitElement(selector: string): Promise<HTMLElement> {
  const MAX_TRIES = 60;
  let tries = 0;
  return new Promise((resolve, reject) => {
    function probe() {
      tries++;
      return document.querySelector(selector);
    }

    function delayedProbe() {
      if (tries >= MAX_TRIES) {
        log("Can't find element with selector", selector);
        reject();
        return;
      }
      const elm = probe();
      if (elm) {
        resolve(elm as any);
        return;
      }

      window.setTimeout(delayedProbe, 250);
    }

    delayedProbe();
  });
}

export function ensure<T>(thing: T | null | undefined, message?: string): T {
  if (!thing) {
    const msg = message || `Expected a value, got ${thing}`;
    throw new Error(msg);
  }

  return thing;
}
