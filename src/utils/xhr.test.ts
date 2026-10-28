import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { onXhrLoad } from "./xhr";

vi.mock("./utils", async (importOriginal) => ({
  ...(await importOriginal()),
  error: vi.fn(),
}));

// No real requests: the hook wraps this no-op `send`
XMLHttpRequest.prototype.send = () => {};

/** Sends a request whose load event is fired by hand. */
function sendRequest(url: string, responseText: string) {
  const xhr = new XMLHttpRequest();
  Object.defineProperty(xhr, "responseURL", { value: url });
  Object.defineProperty(xhr, "responseText", { value: responseText });
  xhr.open("GET", url);
  xhr.send();
  xhr.dispatchEvent(new Event("load"));
}

describe("onXhrLoad", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("calls listeners whose pattern matches, with the parsed response", () => {
    const matching = vi.fn();
    const other = vi.fn();
    onXhrLoad("battle-console", matching);
    onXhrLoad(/job-market/, other);

    sendRequest(
      "https://www.erepublik.com/en/military/battle-console",
      '{"a":1}',
    );
    vi.runAllTimers();

    expect(matching).toHaveBeenCalledWith(
      { a: 1 },
      "https://www.erepublik.com/en/military/battle-console",
    );
    expect(other).not.toHaveBeenCalled();
  });

  it("passes text responses as they are", () => {
    const listener = vi.fn();
    onXhrLoad("wall-post", listener);

    sendRequest("https://www.erepublik.com/en/main/wall-post", "<div></div>");
    vi.runAllTimers();

    expect(listener).toHaveBeenCalledWith("<div></div>", expect.any(String));
  });

  it("stops calling the listener once the signal is aborted", () => {
    const controller = new AbortController();
    const listener = vi.fn();
    onXhrLoad("stats", listener, { signal: controller.signal });

    controller.abort();
    sendRequest("https://www.erepublik.com/en/stats", "{}");
    vi.runAllTimers();

    expect(listener).not.toHaveBeenCalled();
  });
});
