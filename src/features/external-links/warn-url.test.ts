import { describe, expect, it } from "vitest";
import { decodeWarnUrl, LINK_ADDING_REQUEST_PATTERN } from "./warn-url";

function warnLink(target: string) {
  const bytes = new TextEncoder().encode(target);
  return `https://www.erepublik.com/en/main/warn/${btoa(String.fromCharCode(...bytes))}`;
}

describe("decodeWarnUrl", () => {
  it("decodes the target of a warn link", () => {
    expect(decodeWarnUrl(warnLink("https://example.com/a?b=c"))).toBe(
      "https://example.com/a?b=c",
    );
  });

  it("decodes a url-encoded target", () => {
    const link = warnLink("http://example.com/?x=1").replace(/=/g, "%3D");
    expect(decodeWarnUrl(link)).toBe("http://example.com/?x=1");
  });

  it("keeps non-ASCII characters", () => {
    expect(decodeWarnUrl(warnLink("https://example.com/żółw"))).toBe(
      "https://example.com/żółw",
    );
  });

  it("rejects targets that aren't web pages", () => {
    expect(decodeWarnUrl(warnLink("javascript:alert(1)"))).toBeUndefined();
  });

  it("rejects links that aren't valid base64", () => {
    expect(
      decodeWarnUrl("https://www.erepublik.com/en/main/warn/%%%"),
    ).toBeUndefined();
    expect(
      decodeWarnUrl("https://www.erepublik.com/en/main/warn/!!!"),
    ).toBeUndefined();
  });

  it("rejects links that aren't warn links", () => {
    expect(
      decodeWarnUrl("https://www.erepublik.com/en/main/warn/"),
    ).toBeUndefined();
    expect(decodeWarnUrl("https://www.erepublik.com/en")).toBeUndefined();
  });
});

describe("LINK_ADDING_REQUEST_PATTERN", () => {
  it.each([
    "https://www.erepublik.com/en/main/messages-paginated",
    "https://www.erepublik.com/en/main/wall-post/older/",
  ])("matches %s", (url) => {
    expect(LINK_ADDING_REQUEST_PATTERN.test(url)).toBe(true);
  });

  it.each([
    "https://www.erepublik.com/en/main/eat?format=json",
    "https://www.erepublik.com/en/economy/inventory-items/",
    "https://www.erepublik.com/en/military/campaignsJson/list",
  ])("doesn't match %s", (url) => {
    expect(LINK_ADDING_REQUEST_PATTERN.test(url)).toBe(false);
  });
});
