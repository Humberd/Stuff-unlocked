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
import { TravelBackHomeFeature } from "./features/travel-back-home";
import { SidebarFoodTooltipFeature } from "./features/sidebar-food-tooltip";
import { XpLeftFeature } from "./features/xp-left";
import { AutoEatFeature } from "./features/auto-eat";
import { ExternalLinksFeature } from "./features/external-links";
import { MarketMenuLinksFeature } from "./features/market-menu-links";
import { PopupBlockerFeature } from "./features/popup-blocker";
import { CloseTpNotificationsFeature } from "./features/close-tp-notifications";
import { AutoLoginFeature } from "./features/auto-login";
import { AutoRefreshFeature } from "./features/auto-refresh";
import { ElectionsLinkFeature } from "./features/elections-link";
import { ImprovedProfileFeature } from "./features/improved-profile";
import { InfluenceCalculatorFeature } from "./features/influence-calculator";
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
  // These three are inserted right after the same element, in this order
  TravelBackHomeFeature,
  SidebarFoodTooltipFeature,
  XpLeftFeature,
  AutoEatFeature,
  ExternalLinksFeature,
  MarketMenuLinksFeature,
  PopupBlockerFeature,
  CloseTpNotificationsFeature,
  AutoLoginFeature,
  AutoRefreshFeature,
  ElectionsLinkFeature,
  ImprovedProfileFeature,
  InfluenceCalculatorFeature,
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
