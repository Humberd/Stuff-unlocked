export type ChangeKind = "feat" | "fix" | "misc" | "other";

export interface Change {
  kind: ChangeKind;
  text: string;
}

export interface Release {
  version: string;
  date?: string;
  changes: Change[];
}

const RELEASE_HEADER = /^#\s+(\d+(?:\.\d+)*)\s*(?:\((.+)\))?\s*$/;
const CHANGE_LINE = /^\*\s+(.+)$/;
const CHANGE_PREFIX = /^(feat|fix|misc):\s*/i;

export function parseChangelog(markdown: string): Release[] {
  const releases: Release[] = [];
  for (const line of markdown.split(/\r?\n/)) {
    const header = RELEASE_HEADER.exec(line.trim());
    if (header) {
      releases.push({ version: header[1], date: header[2], changes: [] });
      continue;
    }
    const change = CHANGE_LINE.exec(line.trim());
    if (change && releases.length) {
      releases.at(-1)!.changes.push(parseChange(change[1]));
    }
  }
  return releases;
}

function parseChange(line: string): Change {
  const prefix = CHANGE_PREFIX.exec(line);
  if (!prefix) {
    return { kind: "other", text: capitalize(line) };
  }
  return {
    kind: prefix[1].toLowerCase() as ChangeKind,
    text: capitalize(line.slice(prefix[0].length)),
  };
}

function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function compareVersions(a: string, b: string): number {
  const aParts = a.split(".").map(Number);
  const bParts = b.split(".").map(Number);
  for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
    const diff = (aParts[i] ?? 0) - (bParts[i] ?? 0);
    if (diff) {
      return diff;
    }
  }
  return 0;
}

/** Releases newer than `lastSeen`, up to and including `current`, newest first. */
export function releasesBetween(
  releases: Release[],
  lastSeen: string,
  current: string,
): Release[] {
  return releases.filter(
    (release) =>
      compareVersions(release.version, lastSeen) > 0 &&
      compareVersions(release.version, current) <= 0,
  );
}

export function isUserFacing(change: Change): boolean {
  return change.kind !== "misc";
}

export function hasUserFacingChanges(releases: Release[]): boolean {
  return releases.some((release) => release.changes.some(isUserFacing));
}
