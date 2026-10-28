import { createFeature } from "../../utils/feature";
import { getCitizen, isTopWindow } from "../../utils/erep-global-info";
import { isSettingEnabled } from "../../settings/stuff-settings";
import { ExternalProperty } from "../../hooks/external-property";
import { onXhrLoad } from "../../utils/xhr";
import { XpLeft } from "./components/XpLeft";

export const XpLeftFeature = createFeature({
  id: "xp_left",
  name: "XP Left",
  description:
    "Shows in the sidebar how many experience points are left to the next level.",
  canExecute: () => isTopWindow(),
  isSettingEnabled: () => isSettingEnabled("xpLeft"),
  execute: ({ mount, signal }) => {
    const userSection = document.querySelector(".user_section");
    const experiencePoints = getCitizen()?.currentExperiencePoints;
    if (!userSection || experiencePoints === undefined) {
      return;
    }

    const property = new ExternalProperty(experiencePoints);
    // Kills give experience
    onXhrLoad(
      /fight-shoo|deploy-bomb/,
      () => property.update(getCitizen().currentExperiencePoints),
      { signal },
    );

    mount(<XpLeft experiencePoints={property} />, userSection);
  },
});
