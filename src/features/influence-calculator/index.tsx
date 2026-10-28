import { createFeature, type FeatureContext } from "../../utils/feature";
import "./StaticStyles.scss";
import { isSettingEnabled } from "../../settings/stuff-settings";
import { log } from "../../utils/utils";
import {
  isProfilePage,
  parseProfileCitizenId,
} from "../improved-profile/profile-page";
import { waitForProfileData } from "../improved-profile/profile-data";
import { MILITARY_KINDS } from "./influence";
import {
  InfluenceCalculator,
  type ResultBox,
  resultBoxClassName,
} from "./components/InfluenceCalculator";

export const InfluenceCalculatorFeature = createFeature({
  id: "influence_calculator",
  name: "Influence Calculator",
  description:
    "Shows the influence, the hits to the next rank and the cost of a million influence next to the profile's ranks.",
  canExecute: (url) => isProfilePage(url.pathname),
  isSettingEnabled: () => isSettingEnabled("influenceCalculator"),
  execute: async (context) => {
    const profileId = parseProfileCitizenId(window.location.pathname);
    if (profileId === undefined) {
      return;
    }
    const data = await waitForProfileData(profileId, context.signal);

    // The ground rank box comes first, then the aircraft one
    const rankBoxes = [
      ...document.querySelectorAll(".citizen_military_box_wide"),
    ].slice(0, MILITARY_KINDS.length);
    if (rankBoxes.length === 0) {
      log("No military ranks on this profile");
      return;
    }

    document.body.classList.add("su-influence-calculator");
    context.onCleanup(() =>
      document.body.classList.remove("su-influence-calculator"),
    );

    const resultBoxes = rankBoxes.map(
      (rankBox, index): ResultBox => ({
        kind: MILITARY_KINDS[index],
        container: insertResultBox(rankBox, context),
      }),
    );
    context.mount(
      <InfluenceCalculator
        military={data.military.militaryData}
        hasWarStash={Boolean(data.activePacks?.war_stash)}
        resultBoxes={resultBoxes}
      />,
      resultBoxes[resultBoxes.length - 1].container,
      { position: "after", className: "citizen_military" },
    );
  },
});

function insertResultBox(rankBox: Element, { onCleanup }: FeatureContext) {
  const box = document.createElement("div");
  box.classList.add("citizen_military_box", resultBoxClassName);
  rankBox.after(box);
  onCleanup(() => box.remove());
  return box;
}
