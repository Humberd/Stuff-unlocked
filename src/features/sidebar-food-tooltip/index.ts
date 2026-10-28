import { createFeature } from "../../utils/feature";
import { isTopWindow } from "../../utils/erep-global-info";

export const SidebarFoodTooltipFeature = createFeature({
  id: "sidebar_food_tooltip",
  name: "Sidebar Food Tooltip",
  description:
    "Shows a copy of the game's eat food tooltip in the sidebar, so it can be read without hovering.",
  canExecute: () => isTopWindow(),
  execute: ({ onCleanup }) => {
    const userSection = document.querySelector(".user_section");
    const tooltip = document.querySelector("#eatFoodTooltip");
    if (!userSection || !tooltip) {
      return;
    }

    const copy = tooltip.cloneNode(true) as HTMLElement;
    copy.style.padding = "10px";
    copy.style.paddingBottom = "5px";
    copy.style.marginBottom = "10px";
    copy.style.backgroundColor = "rgb(208, 237, 242)";
    userSection.insertAdjacentElement("afterend", copy);
    onCleanup(() => copy.remove());
  },
});
