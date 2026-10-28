import { createFeature } from "../../utils/feature";
import { getCitizen, isTopWindow } from "../../utils/erep-global-info";
import { findResidenceToReturnTo } from "./residence";
import { TravelBackHomeButton } from "./components/TravelBackHomeButton";

export const TravelBackHomeFeature = createFeature({
  id: "travel_back_home",
  name: "Travel Back Home",
  description:
    "Adds a button to the sidebar that travels back to the residence region when the citizen is away from it.",
  canExecute: () => isTopWindow(),
  execute: ({ mount }) => {
    const userSection = document.querySelector(".user_section");
    const citizen = getCitizen();
    if (!userSection || !citizen) {
      return;
    }
    const residence = findResidenceToReturnTo(citizen);
    if (!residence) {
      return;
    }

    mount(<TravelBackHomeButton residence={residence} />, userSection);
  },
});
