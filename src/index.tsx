import "./index.css";
import { addLocationChangeCallback, error, log } from "./utils/utils";
import "./old-index.user.js";
import { AnAmazingJourneyFeature } from "./features/an-amazing-journey";
import { Analytics, FeatureExecutionStatus } from "./analytics/posthog";
import { ImprovedStorage } from "./features/improved-storage";
import { SideInventoryFeature } from "./features/side-inventory";
import { MainPageFeature } from "./features/main-page";
import { countTimeSpent } from "./utils/time";
import { formatNumber } from "./utils/format";

log("React script has successfully started");

const features = [
  AnAmazingJourneyFeature,
  ImprovedStorage,
  SideInventoryFeature,
  MainPageFeature,
];

async function onUrlChange() {
  Analytics.init();

  log(`Found ${features.length} features. Executing...`);
  let executedWithSuccess = 0;
  const executionStatuses: Record<string, FeatureExecutionStatus> = {};
  const promises = features.map(async (feature, index) => {
    const counterString = `[${index + 1}/${features.length}]`;

    if (!feature.canExecute(window.location)) {
      log(
        `${counterString} [SKIP] [${feature.name}] cannot execute on this page`,
      );
      executionStatuses[feature.id] = {
        skipped: "Disabled on this page",
      }
      return;
    }
    if (feature.isSettingEnabled && !feature.isSettingEnabled()) {
      log(`${counterString} [SKIP] [${feature.name}] is disabled in settings`);
      executionStatuses[feature.id] = {
        skipped: "Disabled in settings",
      }
      return;
    }

    try {
      log(`${counterString} [${feature.name}] executing...`);
      const { timeSpent } = await countTimeSpent(() => feature.execute());
      log(
        `${counterString} [${feature.name}] executed successfully in ${formatNumber(timeSpent)}ms`,
      );
      executedWithSuccess++;
      executionStatuses[feature.id] = {
        success: true,
        timeSpentMs: timeSpent,
      }
    } catch (e) {
      error(`Feature ${feature.name} failed to execute`);
      error(e);
      executionStatuses[feature.id] = {
        success: false,
        error: e?.toString() ?? "Unknown error",
      }
    }
  });

  const { timeSpent } = await countTimeSpent(() => Promise.all(promises));
  log(
    `[SUCCESS] ${executedWithSuccess}/${features.length} features started successfully in ${formatNumber(timeSpent)}ms`,
  );

  Analytics.postFeaturesExecutedEvent({
    features: executionStatuses,
    totalTimeSpentMs: timeSpent,
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", watchForUrlChange);
} else {
  watchForUrlChange();
}

function watchForUrlChange() {
  // Call `onUrlChange()` every time the page URL changes, including on first load.
  addLocationChangeCallback(() => {
    // Greasemonkey doesn't bubble errors up to the onUrlChange console,
    // so we have to catch them manually and log them
    onUrlChange().catch((e) => {
      log(e);
    });
  });
}
