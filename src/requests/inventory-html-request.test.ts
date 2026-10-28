import { describe, expect, it } from "vitest";
import { parseUsedStorage } from "./inventory-html-request";

describe("parseUsedStorage", () => {
  it("reads the used and total storage", () => {
    const html = `
      <div class="used_storage_wrapper">
        <span class="used_storage" title="1,234 / 15,678">7%</span>
      </div>`;

    expect(parseUsedStorage(html)).toEqual({ current: 1234, total: 15678 });
  });

  it("throws when the page has changed", () => {
    expect(() => parseUsedStorage("<p></p>")).toThrow("Can't find");
  });
});
