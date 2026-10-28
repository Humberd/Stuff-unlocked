import { createFeature } from "../../utils/feature";
import { getEDay } from "../../utils/erep-global-info";
import { parseFormattedNumber } from "../../utils/format";
import { error } from "../../utils/utils";
import { onXhrLoad } from "../../utils/xhr";
import {
  addHitToBattleStats,
  type BattleStats,
  battleStats,
  battleStatsCookie,
  battleStatsCookieName,
  parseBattleStatsCookie,
  recordedKills,
} from "./battle-stats";
import { game, getBattleIds, isOnBattlefield } from "./game";
import { type Hit, hitFromDeployFinished, hitFromFightResponse } from "./hits";
import { addHitToTodayStats, loadTodayStats } from "./today-stats";

/** pomelo isn't ready right after the page loads. */
const DEPLOY_LISTENER_DELAY_MS = 2_000;

/**
 * Records the kills, prestige points and damage of every hit, bomb and
 * deploy, for today's stats and this battle's stats.
 */
export const KillTrackingFeature = createFeature({
  id: "kill_tracking",
  name: "Kill Tracking",
  description: "Counts today's and this battle's kills and damage.",
  canExecute: isOnBattlefield,
  execute: ({ signal, onCleanup }) => {
    // The epic battle sensor on the main page reads it
    localStorage.setItem("hasMaverick", String(SERVER_DATA.canSwitchDivisions));

    loadTodayStats(getEDay());
    const { battleZoneId, leftCountryId } = getBattleIds();
    const cookieName = battleStatsCookieName(battleZoneId, leftCountryId);
    let stats = readBattleStats(cookieName);
    battleStats.update(stats);
    onCleanup(() => battleStats.update(undefined));

    const isAirBattle = Boolean(SERVER_DATA.onAirforceBattlefield);
    const record = (hit: Hit) => {
      addHitToTodayStats(hit, isAirBattle, getEDay());
      stats = addHitToBattleStats(stats, hit);
      battleStats.update(stats);
      document.cookie = battleStatsCookie(cookieName, stats);
      recordedKills.update(recordedKills.get() + hit.kills);
    };

    onXhrLoad(
      /fight-shoo|deploy-bomb/,
      (response) => {
        const hit = hitFromFightResponse(response);
        if (hit) {
          record(hit);
        }
      },
      { signal },
    );

    const timeoutId = window.setTimeout(
      () => listenToDeploys(record, signal),
      DEPLOY_LISTENER_DELAY_MS,
    );
    onCleanup(() => window.clearTimeout(timeoutId));
  },
});

/** The game shows the damage done in this battle, which is more accurate than the cookie. */
function readBattleStats(cookieName: string): BattleStats {
  const stats = parseBattleStatsCookie(document.cookie, cookieName);
  const totalDamage = document.querySelector("#total_damage strong");
  return totalDamage?.textContent
    ? { ...stats, damage: parseFormattedNumber(totalDamage.textContent) || 0 }
    : stats;
}

function listenToDeploys(record: (hit: Hit) => void, signal: AbortSignal) {
  const pomelo = game.pomelo;
  if (!pomelo) {
    error("pomelo not found, deploys won't be counted");
    return;
  }
  const listener = (data: unknown) => {
    if (signal.aborted) {
      return;
    }
    try {
      record(hitFromDeployFinished(data));
    } catch (e) {
      error("Failed to count a deploy", e);
    }
  };
  pomelo.on("onDeployFinished", listener);
  signal.addEventListener("abort", () =>
    pomelo.removeListener?.("onDeployFinished", listener),
  );
}
