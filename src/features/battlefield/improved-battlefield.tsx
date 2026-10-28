import {
  createFeature,
  type FeatureContext,
  runIndependently,
} from "../../utils/feature";
import { getCitizen, isTopWindow } from "../../utils/erep-global-info";
import { onXhrLoad } from "../../utils/xhr";
import { isSettingEnabled } from "../../settings/stuff-settings";
import "./StaticStyles.scss";
import { epicTitle, regionLabelSuffix } from "./battlefield";
import { game, getBattleIds, isOnBattlefield } from "./game";
import { PersonalStats } from "./components/PersonalStats";
import { EpicProgress } from "./components/EpicProgress";
import { TopLists } from "./components/TopLists";
import { JoinButtons } from "./components/JoinButtons";

/** The game opens the battle setup popup on load, before the player asked for it. */
const SUPPRESS_SETUP_POPUP_MS = 2_000;

export const ImprovedBattlefieldFeature = createFeature({
  id: "improved_battlefield",
  name: "Improved Battlefield",
  description:
    "Personal stats, epic progress, top damage lists and join buttons on the battlefield.",
  canExecute: isOnBattlefield,
  isSettingEnabled: () => isSettingEnabled("battlefield"),
  execute: (context) => {
    addBodyClass(context, "su-improved-battlefield");
    return runIndependently([
      () => showPersonalStats(context),
      ...(isTopWindow()
        ? [
            () => showOverlays(context),
            () => labelRegion(context),
            () => suppressBattleSetupPopup(context),
            () => showEpicTitle(context),
          ]
        : []),
    ]);
  },
});

function addBodyClass({ onCleanup }: FeatureContext, className: string) {
  document.body.classList.add(className);
  onCleanup(() => document.body.classList.remove(className));
}

function showPersonalStats(context: FeatureContext) {
  const totalDamage = document.querySelector("#total_damage");
  if (SERVER_DATA.spectatorOnly || !totalDamage) {
    return;
  }
  addBodyClass(context, "su-battlefield-personal-stats");
  context.mount(<PersonalStats />, totalDamage, { position: "append" });
}

function showOverlays(context: FeatureContext) {
  const pvp = document.querySelector("#pvp");
  if (!pvp) {
    return;
  }
  const ids = getBattleIds();

  if (!SERVER_DATA.onAirforceBattlefield) {
    context.mount(
      <EpicProgress
        battleId={ids.battleId}
        zoneId={ids.zoneId}
        division={game.currentDivision ?? getCitizen().division}
      />,
      pvp,
      { position: "append" },
    );
  }

  if (isSettingEnabled("topLists")) {
    addBodyClass(context, "su-battlefield-top-lists");
    context.mount(
      <TopLists
        battleZoneId={ids.battleZoneId}
        leftCountryId={ids.leftCountryId}
        rightCountryId={ids.rightCountryId}
      />,
      pvp,
      { position: "append" },
    );
  }

  if (!SERVER_DATA.isCivilWar) {
    context.mount(
      <JoinButtons
        battleId={ids.battleId}
        battleZoneId={ids.battleZoneId}
        leftCountryId={ids.leftCountryId}
        rightCountryId={ids.rightCountryId}
        canJoinLeft={Boolean(SERVER_DATA.spectatorOnly)}
      />,
      pvp,
      { position: "append" },
    );
  }
}

function labelRegion({ onCleanup }: FeatureContext) {
  const regionLink = document.querySelector("#region_name_link");
  if (!regionLink) {
    return;
  }
  const originalText = regionLink.textContent;
  regionLink.textContent =
    originalText +
    regionLabelSuffix(Boolean(SERVER_DATA.isResistance), SERVER_DATA.zoneId);
  onCleanup(() => {
    regionLink.textContent = originalText;
  });
}

interface BattleSetupScope extends AngularScope {
  openPopup: () => void;
}

function suppressBattleSetupPopup({ onCleanup }: FeatureContext) {
  const battleSetup = document.querySelector("#battleFooterbattleSetup");
  const scope = battleSetup
    ? (angular.element(battleSetup).scope() as BattleSetupScope | undefined)
    : undefined;
  const openPopup = scope?.openPopup;
  if (!scope || !openPopup) {
    return;
  }

  const doNothing = () => {};
  scope.openPopup = doNothing;
  const restore = () => {
    if (scope.openPopup === doNothing) {
      scope.openPopup = openPopup;
    }
  };
  const timeoutId = window.setTimeout(restore, SUPPRESS_SETUP_POPUP_MS);
  onCleanup(() => {
    window.clearTimeout(timeoutId);
    restore();
  });
}

function showEpicTitle({ signal }: FeatureContext) {
  const { battleZoneId } = getBattleIds();
  onXhrLoad(
    "battle-stats",
    (response) => {
      const title = epicTitle(response, battleZoneId);
      if (title) {
        document.title = title;
      }
    },
    { signal },
  );
}
