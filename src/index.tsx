import "./index.css";
import { addLocationChangeCallback, error, log } from "./utils/utils";
import "./old-index.user.js";
import { AnAmazingJourneyFeature } from "./features/an-amazing-journey";

log("React script has successfully started");

const features = [AnAmazingJourneyFeature];

async function onUrlChange() {
  log(`Testing ${features.length} features`);
  let executedWithSuccess = 0;
  for (const feature of features) {
    if (feature.canExecute(window.location.href)) {
      try {
        await feature.execute();
        executedWithSuccess++;
      } catch (e) {
        error(`Feature ${feature.name} failed to execute`);
        error(e);
      }
    }
  }
  log(`Executed ${executedWithSuccess}/${features.length} features`);
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
