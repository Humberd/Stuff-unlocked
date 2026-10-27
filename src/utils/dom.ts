const marks = new WeakMap<Element, Set<string>>();

/**
 * Returns `true` the first time it is called for a given element and key,
 * and `false` on every later call.
 *
 * Features run again on every URL change, so this lets them attach
 * listeners to long-lived page elements only once.
 */
export function markOnce(element: Element, key: string): boolean {
  let keys = marks.get(element);
  if (!keys) {
    keys = new Set();
    marks.set(element, keys);
  }
  if (keys.has(key)) {
    return false;
  }
  keys.add(key);
  return true;
}

/** Returns the last path segment of a URL, e.g. a citizen id from a profile link. */
export function lastPathSegment(url: string): string {
  return url.split("/").at(-1) ?? "";
}
