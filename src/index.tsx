import "./index.css";
import { addLocationChangeCallback, error, log } from "./utils/utils";
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
import { installXhrHook } from "./utils/xhr";
import { SettingsPanelFeature } from "./features/settings-panel";
import { EpicBattleSensorFeature } from "./features/epic-battle-sensor";
import { WeeklyChallengeCollectAllFeature } from "./features/weekly-challenge-collect-all";
import { HideMedalPostsFeature } from "./features/hide-medal-posts";
import {
  WarsPageCompactLayoutFeature,
  WarsPageCountdownFeature,
  WarsPageMercenaryProgressFeature,
} from "./features/wars-page";

log("React script has successfully started");

// Before the game sends its first request
installXhrHook();

const features = [
  SettingsPanelFeature,
  AnAmazingJourneyFeature,
  ImprovedStorage,
  SideInventoryFeature,
  MainPageFeature,
  TabTitleFeature,
  FeedCommentsScrollFeature,
  PowerSpinFeature,
  DailyChallengeFeature,
  DonatorBadgesFeature,
  EpicBattleSensorFeature,
  WeeklyChallengeCollectAllFeature,
  HideMedalPostsFeature,
  WarsPageCompactLayoutFeature,
  WarsPageCountdownFeature,
  WarsPageMercenaryProgressFeature,
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
