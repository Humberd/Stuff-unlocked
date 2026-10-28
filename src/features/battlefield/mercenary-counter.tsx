import { createFeature } from "../../utils/feature";
import { getCitizenId, isTopWindow } from "../../utils/erep-global-info";
import { ensure } from "../../utils/utils";
import { isSettingEnabled } from "../../settings/stuff-settings";
import * as CitizenProfile from "../../requests/citizen-profile-personal-request";
import { recordedKills } from "./battle-stats";
import { getBattleIds, isOnBattlefield } from "./game";
import {
  freedomFighterKills,
  isFreedomFighterBattle,
  killsToPrefill,
  mercenaryKills,
  regionNameFromTitle,
} from "./mercenary";
import { MercenaryCounter } from "./components/MercenaryCounter";

export const MercenaryCounterFeature = createFeature({
  id: "battlefield_mercenary_counter",
  name: "Mercenary and Freedom Fighter Counter",
  description:
    "Shows the Mercenary and Freedom Fighter kills on the battlefield.",
  canExecute: () =>
    isOnBattlefield() && !SERVER_DATA.isCivilWar && isTopWindow(),
  isSettingEnabled: () => isSettingEnabled("mercFF"),
  execute: async ({ mount }) => {
    const pvp = document.querySelector("#pvp");
    if (!pvp) {
      return;
    }
    const { leftCountryId, rightCountryId } = getBattleIds();

    const profile = await CitizenProfile.sendRequest(
      ensure(getCitizenId(), "Not logged in"),
    );
    const recordedKillsBefore = recordedKills.get();
    const mercenaryProgress = ensure(
      CitizenProfile.findMercenaryProgress(profile),
      "No Mercenary progress in the profile",
    );

    const freedomFighter = isFreedomFighterBattle(SERVER_DATA)
      ? {
          kills: freedomFighterKills(
            profile.freedomFighter,
            regionNameFromTitle(
              document
                .querySelector("#region_name_link")
                ?.getAttribute("title") ?? "",
            ),
          ),
          milestoneKills: profile.freedomFighter.milestone.kills,
        }
      : undefined;

    if (freedomFighter) {
      const killsInput = document.querySelector<HTMLInputElement>("#kills");
      if (killsInput) {
        killsInput.value = String(
          killsToPrefill(freedomFighter.milestoneKills, freedomFighter.kills),
        );
      }
    }

    mount(
      <MercenaryCounter
        mercenary={mercenaryKills(
          mercenaryProgress,
          leftCountryId,
          rightCountryId,
        )}
        freedomFighter={freedomFighter}
        recordedKillsBefore={recordedKillsBefore}
      />,
      pvp,
      { position: "append" },
    );
  },
});
