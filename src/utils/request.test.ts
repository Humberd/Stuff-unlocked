import { describe, expect, it, vi } from "vitest";
import { getHtml, getJson, HttpError, postForm } from "./request";

function mockFetch(body: string, init: ResponseInit = {}) {
  const fetchMock = vi.fn((input: string | URL) => {
    const response = new Response(body, init);
    Object.defineProperty(response, "url", { value: String(input) });
    return Promise.resolve(response);
  });
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

describe("getJson", () => {
  it("prefixes the path and parses the body", async () => {
    const fetchMock = mockFetch('{"a":1}');

    await expect(getJson("/main/x")).resolves.toEqual({ a: 1 });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://www.erepublik.com/en/main/x",
    );
  });

  it("parses JSON error bodies instead of throwing", async () => {
    mockFetch('{"error":1,"message":"nope"}', { status: 400 });

    await expect(getJson("/main/x")).resolves.toEqual({
      error: 1,
      message: "nope",
    });
  });

  it("throws an HttpError for a non-JSON error response", async () => {
    mockFetch("<html>Bad gateway</html>", { status: 502 });

    const result = getJson("/main/x");
    await expect(result).rejects.toBeInstanceOf(HttpError);
    await expect(result).rejects.toMatchObject({ status: 502 });
  });

  it("throws for invalid JSON in a successful response", async () => {
    mockFetch("not json");

    await expect(getJson("/main/x")).rejects.toThrow(/Invalid JSON/);
  });
});

describe("getHtml", () => {
  it("returns the body text", async () => {
    mockFetch("<p>hi</p>");

    await expect(getHtml("/main/x")).resolves.toBe("<p>hi</p>");
  });

  it("throws an HttpError for an error status", async () => {
    mockFetch("", { status: 500 });

    await expect(getHtml("/main/x")).rejects.toBeInstanceOf(HttpError);
  });
});

describe("postForm", () => {
  it("sends a url-encoded body and skips undefined values", async () => {
    const fetchMock = mockFetch('{"error":0,"message":"ok"}');

    await postForm("/main/travel", {
      _token: "abc",
      battleId: 0,
      travelMethod: undefined,
    });

    expect(fetchMock).toHaveBeenCalledWith(
      "https://www.erepublik.com/en/main/travel",
      {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        body: "_token=abc&battleId=0",
      },
    );
  });
});
