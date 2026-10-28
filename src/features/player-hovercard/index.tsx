import { createFeature, type FeatureContext } from "../../utils/feature";
import "./StaticStyles.scss";
import { isSettingEnabled, readStuffData } from "../../settings/stuff-settings";
import { ExternalProperty } from "../../hooks/external-property";
import * as CitizenProfileJson from "../../requests/citizen-profile-json-request";
import * as CitizenHovercard from "../../requests/citizen-hovercard-request";
import { error } from "../../utils/utils";
import { getDonatorBorderUrls } from "../donator-badges/donators";
import {
  HovercardTooltip,
  type HoveredPlayer,
} from "./components/HovercardTooltip";
import { type HovercardData, parsePlayerId } from "./hovercard-data";
import {
  disableGameHovercard,
  type GameHovercardPatch,
} from "./game-hovercard";

const PROFILE_LINK_SELECTOR = '#content a[href*="zen/pro"]';
/** Players are only loaded when the mouse stays on a link, not when it passes over it. */
const LOAD_DELAY_MS = 300;

export const PlayerHovercardFeature = createFeature({
  id: "player_hovercard",
  name: "Player Hovercard",
  description:
    "Replaces the game's player hovercard with one showing ranks, hits, roles and achievements.",
  canExecute: (url) => !url.href.includes("military/campaigns"),
  isSettingEnabled: () => isSettingEnabled("playerTooltip"),
  execute: (context) => {
    const { mount, onCleanup } = context;
    document.body.classList.add("su-player-hovercard");
    onCleanup(() => document.body.classList.remove("su-player-hovercard"));

    const gameHovercard = disableGameHovercard();
    if (gameHovercard) {
      document.body.classList.add("su-player-hovercard-game-off");
      onCleanup(() => {
        document.body.classList.remove("su-player-hovercard-game-off");
        gameHovercard.restore();
      });
    }

    const { contributors = [], unlocked } = readStuffData();
    const hoveredPlayer = new ExternalProperty<HoveredPlayer | null>(null);
    mount(
      <HovercardTooltip
        hoveredPlayer={hoveredPlayer}
        contributors={contributors}
        donatorBorderUrls={
          unlocked ? getDonatorBorderUrls(unlocked) : new Map<string, string>()
        }
      />,
      document.body,
      { position: "append" },
    );

    followProfileLinks(context, hoveredPlayer, gameHovercard);
  },
});

function followProfileLinks(
  { signal, onCleanup }: FeatureContext,
  hoveredPlayer: ExternalProperty<HoveredPlayer | null>,
  gameHovercard: GameHovercardPatch | undefined,
) {
  const loaded = new Map<string, HovercardData>();
  const loading = new Map<string, Promise<HovercardData>>();
  let loadTimeoutId: number | undefined;
  onCleanup(() => window.clearTimeout(loadTimeoutId));

  const isHovered = (anchor: Element) => hoveredPlayer.get()?.anchor === anchor;

  function request(playerId: string) {
    let data = loading.get(playerId);
    if (!data) {
      data = fetchHovercardData(playerId).finally(() =>
        loading.delete(playerId),
      );
      loading.set(playerId, data);
    }
    return data;
  }

  async function load(anchor: Element, playerId: string) {
    try {
      const data = await request(playerId);
      loaded.set(playerId, data);
      if (isHovered(anchor)) {
        hoveredPlayer.update({ anchor, playerId, status: "loaded", data });
      }
    } catch (e) {
      error(`Failed to load the hovercard of player ${playerId}`, e);
      if (isHovered(anchor)) {
        hoveredPlayer.update({ anchor, playerId, status: "failed" });
      }
    }
  }

  function show(anchor: Element, playerId: string) {
    const data = loaded.get(playerId);
    if (data) {
      hoveredPlayer.update({ anchor, playerId, status: "loaded", data });
      return;
    }
    hoveredPlayer.update({ anchor, playerId, status: "loading" });
    loadTimeoutId = window.setTimeout(
      () => void load(anchor, playerId),
      LOAD_DELAY_MS,
    );
  }

  function hide() {
    window.clearTimeout(loadTimeoutId);
    if (hoveredPlayer.get()) {
      hoveredPlayer.update(null);
    }
  }

  // Captured, to stop the game's hovercard before its own mouseenter handler runs
  document.addEventListener(
    "mouseover",
    (event) => {
      if (!(event.target instanceof Element)) {
        return;
      }
      const gameHovercardElement = event.target.closest("[hovercard]");
      if (gameHovercard && gameHovercardElement) {
        gameHovercard.neuter(gameHovercardElement);
      }

      const link = event.target.closest<HTMLAnchorElement>(
        PROFILE_LINK_SELECTOR,
      );
      if (link && isHovered(link)) {
        return;
      }
      // Also catches links removed from the page while hovered, which fire no mouseout
      hide();
      const playerId = link && parsePlayerId(link.href);
      if (link && playerId) {
        show(link, playerId);
      }
    },
    { signal, capture: true },
  );

  document.addEventListener(
    "mouseout",
    (event) => {
      const anchor = hoveredPlayer.get()?.anchor;
      const leftFor = event.relatedTarget;
      if (
        anchor &&
        event.target instanceof Node &&
        anchor.contains(event.target) &&
        !(leftFor instanceof Node && anchor.contains(leftFor))
      ) {
        hide();
      }
    },
    { signal },
  );
}

async function fetchHovercardData(playerId: string): Promise<HovercardData> {
  const [profile, hovercard] = await Promise.all([
    CitizenProfileJson.sendRequest(playerId),
    CitizenHovercard.sendRequest(playerId),
  ]);
  return { profile, hovercard };
}
