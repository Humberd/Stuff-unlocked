import { createFeature } from "../../utils/feature";
import { markOnce } from "../../utils/dom";
import { renderElementWithRoot } from "../../utils/render";
import { retryNullish, waitFor } from "../../utils/time";
import { error } from "../../utils/utils";
import {
  ClaimAllButton,
  createClaimAllButtonRootElement,
  findClaimAllButtonRootElement,
} from "./components/ClaimAllButton";

export const DailyChallengeFeature = createFeature({
  id: "daily_challenge_claim_all",
  name: "Daily Challenge Claim All",
  description:
    "Adds a button to the daily missions popup that claims all rewards and closes it.",
  canExecute: () => true,
  execute: () => {
    const popupTrigger = document.getElementById("dailyMissionsPopupTrigger");
    if (!popupTrigger || !markOnce(popupTrigger, "daily-challenge")) {
      return;
    }

    popupTrigger.addEventListener("click", () => {
      addClaimAllButton().catch((e) => error(e));
    });
  },
});

async function addClaimAllButton() {
  // The popup is rendered after the click, give it a moment
  await waitFor(300);
  const title = await retryNullish(
    () => document.querySelector("#dailyMissionsPopup > h2"),
    "Daily missions popup title not found",
    10,
    100,
  );
  if (findClaimAllButtonRootElement(title)) {
    return;
  }

  const rootElement = createClaimAllButtonRootElement();
  title.appendChild(rootElement);
  renderElementWithRoot(<ClaimAllButton />, rootElement);
}
