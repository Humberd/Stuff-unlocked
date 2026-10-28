import { createRoot } from "react-dom/client";
import changelogMarkdown from "../../../CHANGELOG.md?raw";
import { createFeature } from "../../utils/feature";
import { markOnce } from "../../utils/dom";
import { getStuffVersion } from "../../utils/erep-global-info";
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
/** The CHANGELOG link in the legacy settings panel. */
const CHANGELOG_LINK_SELECTOR = ".stuffWhatsNew";

export const WhatsNewFeature = createFeature({
  id: "whats_new",
  name: "What's New",
  description:
    "After an update, shows what changed since the last version the player saw.",
  canExecute: () => true,
  execute: () => {
    if (!markOnce(document.body, "whats-new")) {
      return;
    }
    const releases = parseChangelog(changelogMarkdown);
    listenForChangelogLink(releases);

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

function listenForChangelogLink(releases: Release[]) {
  document.addEventListener("click", (event) => {
    if (
      event.target instanceof Element &&
      event.target.closest(CHANGELOG_LINK_SELECTOR)
    ) {
      openDialog({
        title: "Stuff++ Unlocked changelog",
        releases,
      });
    }
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
