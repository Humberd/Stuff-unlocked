import { error, log } from "../../utils/utils";
import { waitFor } from "../../utils/time";

const CLAIMABLE_SELECTOR =
  ".missionWrapper:not(.alreadyClaimed) a:not(.disabled).claimButton, .rewardWrapper:not(.claimed) .claimButton";
const CLOSE_BUTTON_SELECTOR =
  '#dailyMissionsPopup > a.close.closeButton[title="Close"]';
/** A safety net, so that a claim button that never goes away can't keep us clicking forever. */
const MAX_CLAIMS = 50;

/**
 * Clicks every claim button in the daily missions popup, one at a time,
 * and closes the popup when there is nothing left to claim.
 */
export async function claimAllAndClose() {
  let delayMs = 1000;
  for (let claims = 0; ; claims++) {
    const claimButtons =
      document.querySelectorAll<HTMLElement>(CLAIMABLE_SELECTOR);
    if (!claimButtons.length) {
      log("No more challenges to claim. Closing challenges window.");
      document.querySelector<HTMLElement>(CLOSE_BUTTON_SELECTOR)?.click();
      return;
    }
    if (claims >= MAX_CLAIMS) {
      error(`Stopped claiming challenges after ${MAX_CLAIMS} clicks`);
      return;
    }

    log(`Challenges to claim: ${claimButtons.length}`);
    claimButtons[0].click();
    await waitFor(delayMs);
    delayMs = 300 + Math.floor(Math.random() * 101);
  }
}
