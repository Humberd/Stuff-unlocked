import { describe, expect, it } from "vitest";
import changelogMarkdown from "../../../CHANGELOG.md?raw";
import {
  compareVersions,
  hasUserFacingChanges,
  parseChangelog,
  releasesBetween,
} from "./changelog";

const markdown = `# 5.10 (14.04.2026)
* Feat: Side inventory (#48)
* Fix: broken player tooltip
* misc: Donation add

# 5.9 (24.08.2025)

* Misc: Update node version
* An Amazing Journey Auto Traveller #29 (#32)

# 5.8
* Fix: travel route
`;

describe("parseChangelog", () => {
  it("reads releases with their date and typed changes", () => {
    const releases = parseChangelog(markdown);

    expect(releases.map((r) => [r.version, r.date])).toEqual([
      ["5.10", "14.04.2026"],
      ["5.9", "24.08.2025"],
      ["5.8", undefined],
    ]);
    expect(releases[0].changes).toEqual([
      { kind: "feat", text: "Side inventory (#48)" },
      { kind: "fix", text: "Broken player tooltip" },
      { kind: "misc", text: "Donation add" },
    ]);
    expect(releases[1].changes[1]).toEqual({
      kind: "other",
      text: "An Amazing Journey Auto Traveller #29 (#32)",
    });
  });

  it("parses the real changelog, newest release first", () => {
    const releases = parseChangelog(changelogMarkdown);

    expect(releases.length).toBeGreaterThan(20);
    expect(releases[0].version).toBe(__APP_VERSION__);
    expect(releases.every((r) => r.changes.length > 0)).toBe(true);
  });
});

describe("compareVersions", () => {
  it("compares numerically, not as strings", () => {
    expect(compareVersions("5.10", "5.9")).toBeGreaterThan(0);
    expect(compareVersions("5.9", "5.10")).toBeLessThan(0);
    expect(compareVersions("6.0", "5.99")).toBeGreaterThan(0);
    expect(compareVersions("5.76", "5.76")).toBe(0);
  });
});

describe("releasesBetween", () => {
  const releases = parseChangelog(markdown);

  it("returns the releases after the last seen one", () => {
    expect(
      releasesBetween(releases, "5.8", "5.10").map((r) => r.version),
    ).toEqual(["5.10", "5.9"]);
  });

  it("skips releases newer than the running version", () => {
    expect(
      releasesBetween(releases, "5.8", "5.9").map((r) => r.version),
    ).toEqual(["5.9"]);
  });

  it("returns nothing when up to date", () => {
    expect(releasesBetween(releases, "5.10", "5.10")).toEqual([]);
  });
});

describe("hasUserFacingChanges", () => {
  it("ignores releases with only misc changes", () => {
    const [, misc] = parseChangelog(`# 2.0\n* Misc: a\n# 1.0\n* Misc: b\n`);

    expect(hasUserFacingChanges([misc])).toBe(false);
    expect(hasUserFacingChanges(parseChangelog(markdown))).toBe(true);
  });
});
