import { createFeature } from "../../utils/feature";
import type { Mounted } from "../../utils/render";
import { isOnHomepage, isTopWindow } from "../../utils/erep-global-info";
import { onXhrLoad } from "../../utils/xhr";
import { waitForElement } from "../../utils/dom";
import { CollectAllButton } from "./components/CollectAllButton";

interface WeeklyChallengeScope {
  getAllReward(): void;
}

export const WeeklyChallengeCollectAllFeature = createFeature({
  id: "weekly_challenge_collect_all",
  name: "Weekly Challenge Collect All",
  description:
    "Adds a button to the weekly challenge that collects all the rewards waiting to be collected.",
  canExecute: () => isOnHomepage() && isTopWindow(),
  execute: ({ signal, mount, onCleanup }) => {
    let button: Mounted | undefined;
    const removeButton = () => {
      button?.unmount();
      button = undefined;
    };
    onCleanup(removeButton);

    const collectAll = () => {
      const scope = angular
        .element("#weeklyChallenge")
        .scope() as unknown as WeeklyChallengeScope;
      scope.getAllReward();
      removeButton();
    };

    const update = () => {
      if (!document.querySelector(".get_milestone_reward")) {
        removeButton();
        return;
      }
      const layer = document.querySelector(".player_layer");
      if (button?.container.isConnected || !layer) {
        return;
      }
      removeButton();
      button = mount(<CollectAllButton onClick={collectAll} />, layer, {
        position: "append",
        tagName: "span",
      });
    };

    onXhrLoad("weekly-challenge-data", update, { signal });
    // The challenge data may have loaded before this ran
    waitForElement(".get_milestone_reward", 10_000).then(update, () => {});
  },
});
