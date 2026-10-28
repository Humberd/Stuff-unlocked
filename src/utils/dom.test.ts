import { beforeEach, describe, expect, it } from "vitest";
import { lastPathSegment, waitForElement } from "./dom";

describe("lastPathSegment", () => {
  it("returns the citizen id from a profile link", () => {
    expect(lastPathSegment("/en/citizen/profile/4659830")).toBe("4659830");
  });
});

describe("waitForElement", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("resolves right away with an element that is already there", async () => {
    document.body.innerHTML = `<p id="here"></p>`;

    await expect(waitForElement("#here")).resolves.toBe(
      document.getElementById("here"),
    );
  });

  it("resolves once the element is added", async () => {
    const result = waitForElement("#later");
    const element = document.createElement("p");
    element.id = "later";
    document.body.appendChild(element);

    await expect(result).resolves.toBe(element);
  });

  it("rejects when the element doesn't show up in time", async () => {
    await expect(waitForElement("#never", 10)).rejects.toThrow(
      "#never not found within 10ms",
    );
  });
});
