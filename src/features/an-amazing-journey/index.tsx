import { createFeature } from "../../utils/feature";
import { awaitElement, log } from "../../utils/utils";
import { findCountryIdFor, MazoviaRegionId, MazuriaRegionId } from "./regions";
import { CountriesCache } from "./countries-cache";
import { Travel } from "../../requests/travel-request";
import { getCsrfToken } from "../../utils/request";
import React, { useState } from "react";
import { AutoTravellerPanel } from "./components/AutoTravellerPanel";
import { createRoot } from "react-dom/client";
import { renderElement } from "../../utils/render";
import { CollapseButtonPanel } from "./components/CollapseButtonPanel";

const countriesCache = new CountriesCache();

export const AnAmazingJourneyFeature = createFeature({
  name: "An Amazing Journey",
  description:
    "An Amazing Journey is a feature where you auto travel between 2 locations to maximize efficiency of a distance travel.",
  canExecute: (url) => url.includes("/main/anniversaryQuest"),
  execute: async () => {
    renderElement(<JourneyFeatureComponent />).before(
      document.querySelector("#cityInfoTopPopup")
    );
  },
});

const JourneyFeatureComponent = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      {!isCollapsed && <AutoTravellerPanel onStart={log} onStop={log} />}
      <CollapseButtonPanel isCollapsed={isCollapsed} onClick={setIsCollapsed} />
    </>
  );
};

// if ((await countriesCache.getCurrentRegionId()) !== MazoviaRegionId) {
//   await travelTo(MazoviaRegionId);
//   countriesCache.updateCurrentRegionId(MazoviaRegionId);
// } else {
//   await travelTo(MazuriaRegionId);
//   countriesCache.updateCurrentRegionId(MazuriaRegionId);
// }
//
// log("Waiting for 5 seconds");
// await waitFor(5000);
//
// if ((await countriesCache.getCurrentRegionId()) !== MazoviaRegionId) {
//   await travelTo(MazoviaRegionId);
//   countriesCache.updateCurrentRegionId(MazoviaRegionId);
// } else {
//   await travelTo(MazuriaRegionId);
//   countriesCache.updateCurrentRegionId(MazuriaRegionId);
// }
async function travelTo(regionId: string) {
  const response = await Travel.sendRequest({
    _token: getCsrfToken(),
    travelMethod: "preferCurrency",
    battleId: "0",
    inRegionId: regionId,
    toCountryId: findCountryIdFor(
      regionId,
      await countriesCache.getCountries()
    ),
  });
  if (response.error === 1) {
    throw Error(`Failed to travel to ${regionId}: ${response.message}`);
  }
  log(`Traveled to ${regionId}`);
}
