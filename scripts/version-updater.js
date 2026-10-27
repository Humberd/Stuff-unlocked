// Bumps the minor version, prepends the commits since the last release
// to CHANGELOG.md and, on GitHub Actions, exposes both as step outputs.
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import { pathToFileURL } from "node:url";

const RELEASE_COMMIT = /^Bump \d+\.\d+\b/;

export function bumpMinorVersion(version) {
  const [major = "0", minor = "0"] = version.split(".");
  return `${Number(major)}.${Number(minor) + 1}`;
}

export function commitsSinceLastRelease(commitSubjects) {
  const lastReleaseIndex = commitSubjects.findIndex((subject) =>
    RELEASE_COMMIT.test(subject),
  );
  return lastReleaseIndex === -1
    ? commitSubjects
    : commitSubjects.slice(0, lastReleaseIndex);
}

/** Formats a date as dd.mm.yyyy, like the existing changelog entries. */
export function formatChangelogDate(date) {
  return date.toISOString().split("T")[0].split("-").reverse().join(".");
}

export function prependChangelogEntry(changelog, version, changes, date) {
  const entries = changes.map((change) => `* ${change}`).join("\n");
  return `# ${version} (${date})\n${entries}\n\n${changelog}`;
}

function replaceVersion(path, newVersion) {
  const content = fs.readFileSync(path, "utf8");
  fs.writeFileSync(
    path,
    content.replace(/(\s+"version":\s+")[\d.]+/, `$1${newVersion}`),
  );
}

function writeGithubOutput(name, value) {
  const delimiter = `EOF_${Math.random().toString(36).slice(2)}`;
  fs.appendFileSync(
    process.env.GITHUB_OUTPUT,
    `${name}<<${delimiter}\n${value}\n${delimiter}\n`,
  );
}

function main() {
  const { version } = JSON.parse(fs.readFileSync("package.json", "utf8"));
  const newVersion = bumpMinorVersion(version);
  console.log(`Bumping version to ${newVersion}`);
  replaceVersion("package.json", newVersion);
  replaceVersion("src/contributors.json", newVersion);

  const commitSubjects = execFileSync("git", ["log", "--pretty=format:%s"])
    .toString()
    .split("\n");
  const changes = commitsSinceLastRelease(commitSubjects);
  console.log("Commits since the last release:", changes);

  const changelog = fs.readFileSync("CHANGELOG.md", "utf8");
  fs.writeFileSync(
    "CHANGELOG.md",
    prependChangelogEntry(
      changelog,
      newVersion,
      changes,
      formatChangelogDate(new Date()),
    ),
  );

  if (process.env.GITHUB_OUTPUT) {
    writeGithubOutput("newVersion", newVersion);
    writeGithubOutput("changes", changes.map((c) => `* ${c}`).join("\n"));
  }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}
