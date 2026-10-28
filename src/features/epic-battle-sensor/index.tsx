import { createFeature } from "../../utils/feature";
import { isSettingEnabled } from "../../settings/stuff-settings";
import {
  getCitizen,
  isOnHomepage,
  isTopWindow,
} from "../../utils/erep-global-info";
import * as CampaignsJsonList from "../../requests/campaigns-json-list-request";
import { findEpicBattle } from "./find-epic-battle";
import { EpicBattleLink, epicBattleTitle } from "./components/EpicBattleLink";

export const EpicBattleSensorFeature = createFeature({
  id: "epic_battle_sensor",
  name: "Epic Battle Sensor",
  description:
    "Shows a link to an epic or full scale battle of the citizen's division in the menu and in the tab title.",
  canExecute: () => isOnHomepage() && isTopWindow(),
  isSettingEnabled: () => isSettingEnabled("epicSensor"),
  execute: async ({ signal, mount, onCleanup }) => {
    const { battles } = await CampaignsJsonList.sendRequest();
    if (signal.aborted) {
      return;
    }
    const battle = findEpicBattle(battles, {
      division: getCitizen().division,
      // Kept up to date by the battlefield feature
      canFightInAnyDivision: localStorage.getItem("hasMaverick") === "true",
    });
    if (!battle) {
      return;
    }

    const menu = document.getElementById("menu3");
    if (menu) {
      mount(<EpicBattleLink battle={battle} />, menu, {
        position: "append",
        tagName: "span",
      });
    }

    // Set after the request, so it replaces the title of the tab title feature
    const previousTitle = document.title;
    const title = epicBattleTitle(battle);
    document.title = title;
    onCleanup(() => {
      if (document.title === title) {
        document.title = previousTitle;
      }
    });
  },
});
