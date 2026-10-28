/** Returns the last path segment of a URL, e.g. a citizen id from a profile link. */
export function lastPathSegment(url: string): string {
  return url.split("/").at(-1) ?? "";
}

/**
 * Resolves with the first element matching `selector` as soon as it is in
 * the page. Rejects when it doesn't show up within `timeoutMs`.
 */
export function waitForElement<E extends Element = Element>(
  selector: string,
  timeoutMs = 2_000,
): Promise<E> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector<E>(selector);
    if (existing) {
      resolve(existing);
      return;
    }

    const observer = new MutationObserver(() => {
      const element = document.querySelector<E>(selector);
      if (element) {
        stop();
        resolve(element);
      }
    });
    const timeoutId = window.setTimeout(() => {
      stop();
      reject(new Error(`${selector} not found within ${timeoutMs}ms`));
    }, timeoutMs);
    function stop() {
      observer.disconnect();
      window.clearTimeout(timeoutId);
    }

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
  });
}
