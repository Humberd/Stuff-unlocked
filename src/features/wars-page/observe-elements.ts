/**
 * Calls `callback` once for every element matching `selector` inside `root`,
 * now and whenever the page adds more, until `signal` is aborted.
 */
export function forEachElement<E extends Element = HTMLElement>(
  root: Element,
  selector: string,
  callback: (element: E) => void,
  signal: AbortSignal,
) {
  const seen = new WeakSet<Element>();
  const visitNew = () => {
    for (const element of root.querySelectorAll<E>(selector)) {
      if (!seen.has(element)) {
        seen.add(element);
        callback(element);
      }
    }
  };

  visitNew();
  const observer = new MutationObserver(visitNew);
  observer.observe(root, { childList: true, subtree: true });
  signal.addEventListener("abort", () => observer.disconnect());
}
