import { createRoot } from "react-dom/client";
import changelogMarkdown from "../../../CHANGELOG.md?raw";
import { createFeature } from "../../utils/feature";
import { getStuffVersion, isTopWindow } from "../../utils/erep-global-info";
import { error } from "../../utils/utils";
import {
  compareVersions,
  hasUserFacingChanges,
  parseChangelog,
  type Release,
  releasesBetween,
} from "./changelog";
import { WhatsNewDialog } from "./components/WhatsNewDialog";

const LAST_SEEN_VERSION_KEY = "STUFF_UNLOCKED.whatsNew.lastSeenVersion";

let isChecked = false;

export const WhatsNewFeature = createFeature({
  id: "whats_new",
  name: "What's New",
  description:
    "After an update, shows what changed since the last version the player saw.",
  canExecute: () => isTopWindow(),
  execute: () => {
    // Once per page load, the dialog stays open across navigations
    if (isChecked) {
      return;
    }
    isChecked = true;
    const releases = parseChangelog(changelogMarkdown);

    const current = getStuffVersion();
    const lastSeen = readLastSeenVersion(releases);
    if (!lastSeen) {
      saveLastSeenVersion(current);
      return;
    }
    if (compareVersions(current, lastSeen) <= 0) {
      return;
    }

    const pending = releasesBetween(releases, lastSeen, current);
    if (!hasUserFacingChanges(pending)) {
      saveLastSeenVersion(current);
      return;
    }
    openDialog({
      title: `Stuff++ Unlocked updated to ${current}`,
      subtitle: `What's new since ${lastSeen}`,
      releases: pending,
      onClose: () => saveLastSeenVersion(current),
    });
  },
});

function readLastSeenVersion(releases: Release[]): string | undefined {
  try {
    const stored = localStorage.getItem(LAST_SEEN_VERSION_KEY);
    if (stored) {
      return stored;
    }
    // Versions before this feature saved nothing, but they did leave the
    // legacy settings behind, which tells an update apart from a fresh install.
    if (localStorage.getItem("stuff")) {
      return releases[1]?.version;
    }
  } catch (e) {
    error("Failed to read the last seen version", e);
  }
  return undefined;
}

function saveLastSeenVersion(version: string) {
  try {
    localStorage.setItem(LAST_SEEN_VERSION_KEY, version);
  } catch (e) {
    error("Failed to save the last seen version", e);
  }
}

/** Shows the whole history, opened from the settings panel. */
export function openChangelog() {
  openDialog({
    title: "Stuff++ Unlocked changelog",
    releases: parseChangelog(changelogMarkdown),
  });
}

function openDialog(props: {
  title: string;
  subtitle?: string;
  releases: Release[];
  onClose?: () => void;
}) {
  const rootElement = document.createElement("div");
  document.body.appendChild(rootElement);
  const root = createRoot(rootElement);
  const close = () => {
    root.unmount();
    rootElement.remove();
    props.onClose?.();
  };
  root.render(<WhatsNewDialog {...props} onClose={close} />);
}
