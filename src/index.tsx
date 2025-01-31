import "./index.css";
import { addLocationChangeCallback, error, log } from "./utils/utils";
import "./old-index.user.js";
import { AnAmazingJourneyFeature } from "./features/an-amazing-journey";
import { Analytics } from "./analytics/posthog";
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
  const promises = features.map(async (feature, index) => {
    const counterString = `[${index + 1}/${features.length}]`;

    if (!feature.canExecute(window.location)) {
      log(
        `${counterString} [SKIP] [${feature.name}] cannot execute on this page`,
      );
      return;
    }
    try {
      log(`${counterString} [${feature.name}] executing...`);
      const { timeSpent } = await countTimeSpent(() => feature.execute());
      log(
        `${counterString} [${feature.name}] executed successfully in ${formatNumber(timeSpent)}ms`,
      );
      executedWithSuccess++;
    } catch (e) {
      error(`Feature ${feature.name} failed to execute`);
      error(e);
    }
  });

  const {timeSpent} = await countTimeSpent(() => Promise.all(promises));
  log(
    `[SUCCESS] ${executedWithSuccess}/${features.length} features started successfully in ${formatNumber(timeSpent)}ms`,
  );
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
