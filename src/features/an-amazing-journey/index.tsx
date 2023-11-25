import { createFeature } from "../../utils/feature";
import { log } from "../../utils/utils";
import { CountriesCache } from "./countries-cache";
import React, { useState } from "react";
import {
  AutoTravelForm,
  AutoTravellerPanel,
} from "./components/AutoTravellerPanel";
import { renderElement } from "../../utils/render";
import { CollapseButtonPanel } from "./components/CollapseButtonPanel";
import {
  TravelProgressPanel,
  TravelProgressState,
  TravelProgressStatus,
} from "./components/TravelProgressPanel";
import { createNewTravelProgressState, getTotalTravelledDistanceKm } from "./travel";
import { getCitizenshipCurrencyName } from "../../utils/erep-global-info";
import { travelRouteTest } from "./regions";
import { AnniversaryQuestData } from "../../requests/anniversary-quest-data-request";

const countriesCache = new CountriesCache();

const TIMER_INTERVAL_MS = 5_000;
const currentTravelRoute = travelRouteTest

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
  const [travelProgressState, setTravelProgressState] = useState<
    TravelProgressState | undefined
  >();
  const [shouldStop, setShouldStop] = useState(false);

  const onStart = async (form: AutoTravelForm) => {
    countriesCache.getCountries();
    const currencyUnit =
      form.resourceUsed === "preferCurrency"
        ? getCitizenshipCurrencyName()
        : "tickets";
    setTravelProgressState(createNewTravelProgressState(currencyUnit));

    const initialTravelledDistance = await getTotalTravelledDistanceKm();

    const callback = () => {
      if (shouldStop) {
        setShouldStop(false);
        setTravelProgressState((state) => {
          if (state) {
            return {
              ...state,
              status: TravelProgressStatus.Completed,
            };
          }
          return state;
        });
        return;
      }


    }




    // callback();
    // setInterval(callback, TIMER_INTERVAL_MS);
  };

  const onStop = () => {
    setShouldStop(true);
  };

  return (
    <>
      <CollapseButtonPanel isCollapsed={isCollapsed} onClick={setIsCollapsed} />
      {!isCollapsed && <AutoTravellerPanel onStart={onStart} onStop={log} />}
      {!isCollapsed && travelProgressState && (
        <TravelProgressPanel state={travelProgressState} />
      )}
    </>
  );
};
