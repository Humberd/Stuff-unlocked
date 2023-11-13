const fs = require("fs");

function getCurrentVersion() {
  return require("../package.json").version;
}

const Type = {
  major: "major",
  minor: "minor",
};

function bumpCurrentVersion(type) {
  let [major, minor] = getCurrentVersion().split(".");
  major = major || 0;
  minor = minor || 0;
  switch (type) {
    case Type.major:
      return `${Number(major) + 1}.0`;
    case Type.minor:
      return `${major}.${Number(minor) + 1}`;
    default:
      throw new Error("Invalid version type");
  }
}

function updateVersionInPackageJson(newVersion) {
  const path = "./package.json";
  const packageJson = fs.readFileSync(path, "utf8");
  const updatedPackageJson = packageJson.replace(
    /(\s+"version":\s+")[\d.]+/,
    `$1${newVersion}`
  );
  fs.writeFileSync(path, updatedPackageJson);
}

function updateVersionInContributorsJson(newVersion) {
  const path = "./src/contributors.json";
  const contributorsJson = fs.readFileSync(path, "utf8");
  const updatedContributorsJson = contributorsJson.replace(
    /(\s+"version":\s+")[\d.]+/,
    `$1${newVersion}`
  );
  fs.writeFileSync(path, updatedContributorsJson);
}

function updateVersionInIndexUserJs(newVersion) {
  const path = "./src/index.user.js";
  const indexUserJs = fs.readFileSync(path, "utf8");
  const updatedIndexUserJs = indexUserJs.replace(
    /\/\/\s+@version\s+[\d.]+/,
    `// @version		${newVersion}`
  );
  fs.writeFileSync(path, updatedIndexUserJs);
}

function updateAllVersions(newVersion) {
  updateVersionInPackageJson(newVersion);
  updateVersionInContributorsJson(newVersion);
  updateVersionInIndexUserJs(newVersion);
}

function getAllCommitsSinceLastBump() {
  const commits = require("child_process")
    .execSync("git log --pretty=format:%s")
    .toString()
    .split("\n");
  const lastBumpIndex = commits.findIndex((commit) => commit.includes("Bump"));
  return commits.slice(0, lastBumpIndex);
}

function prependChangesToChangelog(version, changes, date) {
  const path = "./CHANGELOG.md";
  const changelog = fs.readFileSync(path, "utf8");
  const updatedChangelog = `# ${version} (${date})\n${changes
    .map((change) => `* ${change}`)
    .join("\n")}\n\n${changelog}`;

  fs.writeFileSync(path, updatedChangelog);
}

function doAll() {
  const newVersion = bumpCurrentVersion(Type.minor);
  updateAllVersions(newVersion);

  const currentDate = new Date()
    .toISOString()
    .split("T")[0]
    .split("-")
    .reverse()
    .join(".");

  prependChangesToChangelog(
    newVersion,
    getAllCommitsSinceLastBump(),
    currentDate
  );
}

doAll();