import { createFeature, type FeatureContext } from "../../utils/feature";
import { waitFor } from "../../utils/time";
import { waitForElement } from "../../utils/dom";
import { error } from "../../utils/utils";
import {
  ClaimAllButton,
  claimAllButtonMountOptions,
  findClaimAllButtonRootElement,
} from "./components/ClaimAllButton";

export const DailyChallengeFeature = createFeature({
  id: "daily_challenge_claim_all",
  name: "Daily Challenge Claim All",
  description:
    "Adds a button to the daily missions popup that claims all rewards and closes it.",
  canExecute: () => true,
  execute: ({ signal, mount }) => {
    const popupTrigger = document.getElementById("dailyMissionsPopupTrigger");
    if (!popupTrigger) {
      return;
    }

    popupTrigger.addEventListener(
      "click",
      () => {
        addClaimAllButton(mount).catch((e) => error(e));
      },
      { signal },
    );
  },
});

async function addClaimAllButton(mount: FeatureContext["mount"]) {
  // The popup is rendered after the click, give it a moment
  await waitFor(300);
  const title = await waitForElement("#dailyMissionsPopup > h2", 1_000);
  if (findClaimAllButtonRootElement(title)) {
    return;
  }

  mount(<ClaimAllButton />, title, claimAllButtonMountOptions);
}
