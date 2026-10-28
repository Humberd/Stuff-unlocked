import { error } from "./utils";

/**
 * Listeners run this long after a response arrived, so that the game has
 * updated the page with it by then.
 */
const LISTENER_DELAY_MS = 200;

type XhrListener = (response: unknown, url: string) => void;

interface Registration {
  pattern: RegExp | string;
  listener: XhrListener;
}

const registrations = new Set<Registration>();
let isInstalled = false;

/**
 * Lets features react to the game's own requests. Call it as early as
 * possible, so that no request is missed.
 */
export function installXhrHook() {
  if (isInstalled) {
    return;
  }
  isInstalled = true;

  // eslint-disable-next-line @typescript-eslint/unbound-method -- called with the request as `this`
  const originalSend = XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.send = function (this: XMLHttpRequest, ...args) {
    this.addEventListener("load", () => notifyListeners(this));
    originalSend.apply(this, args);
  };
}

/**
 * Calls `listener` with the parsed response of every game request whose URL
 * contains `pattern` (or matches it), until `signal` is aborted.
 */
export function onXhrLoad(
  pattern: RegExp | string,
  listener: XhrListener,
  { signal }: { signal?: AbortSignal } = {},
) {
  if (signal?.aborted) {
    return;
  }
  installXhrHook();
  const registration = { pattern, listener };
  registrations.add(registration);
  signal?.addEventListener("abort", () => registrations.delete(registration));
}

function notifyListeners(xhr: XMLHttpRequest) {
  const url = xhr.responseURL;
  const matching = [...registrations].filter(({ pattern }) =>
    typeof pattern === "string" ? url.includes(pattern) : pattern.test(url),
  );
  if (matching.length === 0) {
    return;
  }

  const response = parseResponse(xhr);
  setTimeout(() => {
    for (const registration of matching) {
      // It may have been removed in the meantime
      if (!registrations.has(registration)) {
        continue;
      }
      try {
        registration.listener(response, url);
      } catch (e) {
        error(`Failed to handle the response from ${url}`, e);
      }
    }
  }, LISTENER_DELAY_MS);
}

function parseResponse(xhr: XMLHttpRequest): unknown {
  if (xhr.responseType !== "" && xhr.responseType !== "text") {
    return xhr.response;
  }
  const text = xhr.responseText;
  if (!/^\s*[[{]/.test(text)) {
    return text;
  }
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
}
