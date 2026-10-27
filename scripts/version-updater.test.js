import { describe, expect, it } from "vitest";
import {
  bumpMinorVersion,
  commitsSinceLastRelease,
  formatChangelogDate,
  prependChangelogEntry,
} from "./version-updater.js";

describe("bumpMinorVersion", () => {
  it("bumps the minor part", () => {
    expect(bumpMinorVersion("5.76")).toBe("5.77");
    expect(bumpMinorVersion("5.9")).toBe("5.10");
  });
});

describe("commitsSinceLastRelease", () => {
  it("stops at the last release commit", () => {
    expect(
      commitsSinceLastRelease(["Fix: b", "Feat: a", "Bump 5.76 (#64)", "Old"]),
    ).toEqual(["Fix: b", "Feat: a"]);
  });

  it("ignores commits that only mention bumping", () => {
    expect(
      commitsSinceLastRelease(["Misc: Bump sass", "Bump 5.76 (#64)", "Old"]),
    ).toEqual(["Misc: Bump sass"]);
  });

  it("returns every commit when there was no release yet", () => {
    expect(commitsSinceLastRelease(["a", "b"])).toEqual(["a", "b"]);
  });
});

describe("changelog", () => {
  it("formats dates as dd.mm.yyyy", () => {
    expect(formatChangelogDate(new Date("2026-04-14T10:00:00Z"))).toBe(
      "14.04.2026",
    );
  });

  it("prepends a new entry", () => {
    expect(
      prependChangelogEntry("# 5.76\n", "5.77", ["a", "b"], "1.1.2027"),
    ).toBe("# 5.77 (1.1.2027)\n* a\n* b\n\n# 5.76\n");
  });
});
