import { createFeature } from "../../utils/feature";
import { error, log } from "../../utils/utils";
import { CountriesCache } from "./countries-cache";
import React, { useEffect, useRef, useState } from "react";
import {
  AutoTravelForm,
  AutoTravelFormState,
  AutoTravellerPanel,
} from "./components/AutoTravellerPanel";
import { renderElement } from "../../utils/render";
import { CollapseButtonPanel } from "./components/CollapseButtonPanel";
import {
  TravelProgressPanel,
  TravelProgressState,
  TravelProgressStatus,
} from "./components/TravelProgressPanel";
import {
  createNewTravelProgressState,
  getTotalTravelledDistanceKm,
  getTravelInfoTo,
  TravelInfo,
  travelTo,
} from "./travel";
import { getCitizenshipCurrencyName } from "../../utils/erep-global-info";
import { travelRouteTest } from "./regions";

const countriesCache = new CountriesCache();

const TIMER_INTERVAL_MS = 5_000;
const currentTravelRoute = travelRouteTest;

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
  const [travelFormState, setTravelFormState] = useState<AutoTravelFormState>(
    AutoTravelFormState.IDLE
  );
  const [shouldStop, setShouldStop] = useState(false);
  const shouldStopRef = useRef(shouldStop);
  useEffect(() => {
    shouldStopRef.current = shouldStop;
  }, [shouldStop]);

  const onStart = async (form: AutoTravelForm) => {
    setTravelFormState(AutoTravelFormState.STARTED);
    const currencyUnit =
      form.resourceUsed === "preferCurrency"
        ? getCitizenshipCurrencyName()
        : "tickets";
    let travelledDistanceKm = 0;
    setTravelProgressState(createNewTravelProgressState(currencyUnit));

    const initialTravelledDistanceKm = await getTotalTravelledDistanceKm();
    const initialRegionId = await countriesCache.getCurrentRegionId();
    let nextTargetRegionId =
      initialRegionId === currentTravelRoute.regionIdA
        ? currentTravelRoute.regionIdB
        : currentTravelRoute.regionIdA;
    let setIntervalId: number;

    const handleStop = async (errorMessage?: string) => {
      if (errorMessage) {
        log(`Stopping due to error: ${errorMessage}`);
      } else {
        log("Stopping...");
      }
      setShouldStop(false);
      setTravelProgressState((state) => {
        if (state) {
          return {
            ...state,
            status: errorMessage
              ? TravelProgressStatus.Error
              : TravelProgressStatus.Completed,
            errorMessage,
          };
        }
        return state;
      });
      clearInterval(setIntervalId);
      if (
        form.travelBackAfterFinish &&
        (await countriesCache.getCurrentRegionId()) !== initialRegionId
      ) {
        log(`Travelling back to initial region ${initialRegionId}...`);
        try {
          await travelTo(initialRegionId, form.resourceUsed, countriesCache);
          log(`Travelled back to initial region ${initialRegionId}`);
        } catch (e) {
          error(`Failed to travel back to initial region ${initialRegionId}`);
          error(e);
        }
      }
      setTravelFormState(AutoTravelFormState.IDLE);
    };

    const callback = async () => {
      if (shouldStopRef.current) {
        await handleStop();
        return;
      }
      let travelInfo: TravelInfo;
      try {
        log(`Getting travel info for region ${nextTargetRegionId}...`);
        travelInfo = await getTravelInfoTo(nextTargetRegionId);
        log(`Got travel info for region ${nextTargetRegionId}`, travelInfo);
      } catch (e: any) {
        error(`Failed to get travel info for region ${nextTargetRegionId}`);
        error(e);
        await handleStop(e.message);
        return;
      }

      try {
        log(`Travelling to region ${nextTargetRegionId}...`);
        await travelTo(nextTargetRegionId, form.resourceUsed, countriesCache);
        log(`Travelled to region ${nextTargetRegionId}`);
      } catch (e: any) {
        error(`Failed to travel to region ${nextTargetRegionId}`);
        error(e);
        await handleStop(e.message);
        return;
      }


      const resourcesSAmountSpentThisTravel =
        form.resourceUsed === "preferTicket"
          ? travelInfo.ticketCost
          : travelInfo.currencyCost;

      nextTargetRegionId =
        nextTargetRegionId === currentTravelRoute.regionIdA
          ? currentTravelRoute.regionIdB
          : currentTravelRoute.regionIdA;

      travelledDistanceKm += travelInfo.distanceKm;

      setTravelProgressState((state) => {
        if (state) {
          return {
            ...state,
            travelledDistanceKm: travelledDistanceKm,
            travelsCompleted: state.travelsCompleted + 1,
            resourcesSpent: {
              amount:
                state.resourcesSpent.amount + resourcesSAmountSpentThisTravel,
              unit: state.resourcesSpent.unit,
            },
          };
        }
        return state;
      });
      if (travelledDistanceKm >= Number(form.targetDistanceKm)) {
        await handleStop();
      }
    };

    await callback();
    setIntervalId = window.setInterval(callback, TIMER_INTERVAL_MS);
  };

  const onStop = () => {
    log("Stopping manually...");
    setTravelFormState(AutoTravelFormState.STOPPING);
    setShouldStop(true);
  };

  return (
    <>
      <CollapseButtonPanel isCollapsed={isCollapsed} onClick={setIsCollapsed} />
      {!isCollapsed && (
        <AutoTravellerPanel
          onStart={onStart}
          onStop={onStop}
          state={travelFormState}
        />
      )}
      {!isCollapsed && travelProgressState && (
        <TravelProgressPanel state={travelProgressState} />
      )}
    </>
  );
};
