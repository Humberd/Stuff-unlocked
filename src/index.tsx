import "./index.css";
import { addLocationChangeCallback, error, log } from "./utils/utils";
import "./old-index.user.js";
import { AnAmazingJourneyFeature } from "./features/an-amazing-journey";
import { Analytics } from "./analytics/posthog";
import { ImprovedStorage } from "./features/improved-storage";
import { SideInventoryFeature } from "./features/side-inventory";
import { MainPageFeature } from "./features/main-page";
import { TabTitleFeature } from "./features/tab-title";
import { FeedCommentsScrollFeature } from "./features/feed-comments-scroll";
import { PowerSpinFeature } from "./features/power-spin";
import { DailyChallengeFeature } from "./features/daily-challenge";
import { DonatorBadgesFeature } from "./features/donator-badges";
import { WhatsNewFeature } from "./features/whats-new";
import { FeatureRunner } from "./feature-runner";

log("React script has successfully started");

const features = [
  AnAmazingJourneyFeature,
  ImprovedStorage,
  SideInventoryFeature,
  MainPageFeature,
  TabTitleFeature,
  FeedCommentsScrollFeature,
  PowerSpinFeature,
  DailyChallengeFeature,
  DonatorBadgesFeature,
  WhatsNewFeature,
];

const featureRunner = new FeatureRunner(features);

async function onUrlChange() {
  Analytics.init();
  const { statuses, totalTimeSpentMs } = await featureRunner.run(
    window.location,
  );
  Analytics.postFeaturesExecutedEvent({
    features: statuses,
    totalTimeSpentMs,
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", watchForUrlChange);
} else {
  watchForUrlChange();
}

function watchForUrlChange() {
  // Call `onUrlChange()` on first load and every time the page URL changes.
  addLocationChangeCallback(() => {
    // Greasemonkey doesn't bubble errors up to the onUrlChange console,
    // so we have to catch them manually and log them
    onUrlChange().catch((e) => {
      error(e);
    });
  });
}
