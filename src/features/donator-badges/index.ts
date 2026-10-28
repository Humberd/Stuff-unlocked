import { createFeature, type FeatureContext } from "../../utils/feature";
import { lastPathSegment } from "../../utils/dom";
import { log } from "../../utils/utils";
import { readStuffData } from "../../settings/stuff-settings";
import { getDonatorBorderUrls } from "./donators";
import styles from "./DonatorBadges.module.scss";

/** Marks every element this feature adds, so it can be removed again. */
const BADGE_CLASS = "su-donator-badge";
/** Remembers which player an element was decorated for. */
const DECORATED_FOR_KEY = "suDonatorBadgeFor";
const SCAN_DELAY_MS = 200;

let borderUrls = new Map<string, string>();

export const DonatorBadgesFeature = createFeature({
  id: "donator_badges",
  name: "Donator Badges",
  description:
    "Decorates the avatars of Stuff++ Unlocked donators with an animated border.",
  canExecute: () => true,
  execute: (context) => {
    exposeToLegacyHovercard();

    const donatorsData = readStuffData().unlocked;
    if (!donatorsData) {
      log("No donators data cached yet");
      return;
    }
    borderUrls = getDonatorBorderUrls(donatorsData);

    applyBadges();
    observePageChanges(context);
  },
});

interface AvatarTarget {
  selector: string;
  getPlayerId: (element: HTMLElement) => string | undefined;
  /** The element the border is put on, the matched element by default. */
  getAvatar?: (element: HTMLElement) => HTMLElement | null;
  borderClassNames?: string[];
  /** Extra decorations of the matched element. */
  decorate?: (element: HTMLElement) => void;
}

const avatarTargets: AvatarTarget[] = [
  // Feed posts and their comments
  {
    selector: "a.userAvatar",
    getPlayerId: playerIdFromLink,
  },
  // Article comments
  {
    selector: "a.citizenAvatar",
    getPlayerId: playerIdFromLink,
  },
  // Profile page
  {
    selector: ".citizen_profile_header > a",
    getPlayerId: () => lastPathSegment(window.location.pathname),
    decorate: (element) => {
      element.classList.add(styles.ProfileAvatar);
      const avatar = element.querySelector<HTMLElement>(".citizen_avatar");
      if (avatar) {
        avatar.style.left = "0";
      }
    },
  },
  // Battlefield console
  {
    selector: "#console_left > li, #console_right > li",
    getPlayerId: (element) => playerIdFromLink(element.querySelector("q a")),
    getAvatar: (element) => element.querySelector("q"),
    borderClassNames: [styles.NoZIndex],
    decorate: (element) => {
      const playerName = element.querySelector(".player_name");
      if (!playerName) {
        return;
      }
      playerName.querySelector("a")?.classList.add(styles.BattlefieldName);
      const animation = document.createElement("div");
      animation.classList.add(BADGE_CLASS, styles.BattlefieldNameAnimation);
      playerName.appendChild(animation);
    },
  },
];

function applyBadges() {
  for (const target of avatarTargets) {
    const elements = document.querySelectorAll<HTMLElement>(target.selector);
    for (const element of elements) {
      const avatar = target.getAvatar ? target.getAvatar(element) : element;
      if (!avatar) {
        continue;
      }
      // The game reuses some elements for other players, e.g. when switching feed tabs
      const playerId = target.getPlayerId(element) ?? "";
      if (element.dataset[DECORATED_FOR_KEY] === playerId) {
        continue;
      }
      removeBadge(element);
      element.dataset[DECORATED_FOR_KEY] = playerId;

      const borderUrl = borderUrls.get(playerId);
      if (!borderUrl) {
        continue;
      }
      avatar.appendChild(
        createBorderElement(borderUrl, target.borderClassNames),
      );
      target.decorate?.(element);
    }
  }
}

function removeBadge(element: HTMLElement) {
  element.querySelectorAll(`.${BADGE_CLASS}`).forEach((e) => e.remove());
  element
    .querySelectorAll(`.${styles.BattlefieldName}`)
    .forEach((e) => e.classList.remove(styles.BattlefieldName));
  element.classList.remove(styles.ProfileAvatar);
}

function createBorderElement(url: string, classNames: string[] = []) {
  const image = document.createElement("img");
  image.src = url;
  image.classList.add(BADGE_CLASS, styles.Border, ...classNames);
  return image;
}

/** Decorates avatars that show up later: more posts, comments, battle console entries. */
function observePageChanges({ onCleanup }: FeatureContext) {
  let scanTimeoutId: number | undefined;
  const observer = new MutationObserver(() => {
    if (scanTimeoutId !== undefined) {
      return;
    }
    scanTimeoutId = window.setTimeout(() => {
      scanTimeoutId = undefined;
      applyBadges();
    }, SCAN_DELAY_MS);
  });
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["href"],
  });
  onCleanup(() => {
    observer.disconnect();
    window.clearTimeout(scanTimeoutId);
  });
}

function exposeToLegacyHovercard() {
  window.isDonator = (playerId) => borderUrls.has(playerId);
  window.createBorderElementBasedOnDonatorLevel = (playerId) =>
    createBorderElement(borderUrls.get(playerId) ?? "");
}

function playerIdFromLink(link: Element | null): string | undefined {
  const href = link?.getAttribute("href");
  return href ? lastPathSegment(href) : undefined;
}
