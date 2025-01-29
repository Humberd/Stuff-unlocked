import { createFeature } from "../../utils/feature";
import { error, log } from "../../utils/utils";
import { CountriesCache } from "./countries-cache";
import React, { useEffect, useRef, useState } from "react";
import { AutoTravelForm, AutoTravelFormState, AutoTravellerPanel } from "./components/AutoTravellerPanel";
import { renderElement } from "../../utils/render";
import { CollapseButtonPanel } from "./components/CollapseButtonPanel";
import { TravelProgressPanel, TravelProgressState, TravelProgressStatus } from "./components/TravelProgressPanel";
import { createNewTravelProgressState, executeTravel, TravelInfo } from "./travel";
import { getCitizenshipCurrencyName } from "../../utils/erep-global-info";
import { travelRouteMain } from "./regions";
import { ErrorPanel } from "./components/ErrorPanel";
import { useLocalStorage } from "../../hooks/storage";

const countriesCache = new CountriesCache();

const TIMER_INTERVAL_MS = 5_000;
const currentTravelRoute = travelRouteMain;

export const AnAmazingJourneyFeature = createFeature({
  name: "An Amazing Journey",
  description:
    "An Amazing Journey is a feature where you auto travel between 2 locations to maximize efficiency of a distance travel.",
  canExecute: (url) => url.href.includes("/main/anniversaryQuest"),
  execute: async () => {
    renderElement(<JourneyFeatureComponent />).before(
      document.querySelector("#cityInfoTopPopup")
    );
  },
});

const JourneyFeatureComponent = () => {
  const [isCollapsed, setIsCollapsed] = useLocalStorage(
    "AnAmazingJourney.isCollapsed",
    false
  );
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
  const [errors, setErrors] = useState<Error[]>([]);

  const onStart = async (form: AutoTravelForm) => {
    log("Starting...", form);
    setTravelFormState(AutoTravelFormState.STARTED);
    const currencyUnit =
      form.resourceUsed === "preferCurrency"
        ? getCitizenshipCurrencyName()
        : "tickets";
    let travelledDistanceKm = 0;
    setTravelProgressState(createNewTravelProgressState(currencyUnit));

    const initialRegionId = await countriesCache.getCurrentRegionId({skipCache: true});
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
      const stopInternalHandler = async () => {
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
        // Stop button should be disabled immediately
        setTravelFormState(AutoTravelFormState.STOPPING);

        // Start button should be enabled after 5 seconds
        // to prevent spamming the server
        setTimeout(() => {
          setTravelFormState(AutoTravelFormState.IDLE);
        }, TIMER_INTERVAL_MS)
      };

      clearInterval(setIntervalId);
      const isInInitialRegion =
        (await countriesCache.getCurrentRegionId({ skipCache: true })) ===
        initialRegionId;

      if (form.travelBackAfterFinish && !isInInitialRegion) {
        log(`Waiting ${TIMER_INTERVAL_MS}ms to travel back...`);
        setTimeout(async () => {
          const travelInfo = await executeTravel(initialRegionId, form, countriesCache);
          updateTravelProgressState(travelInfo);
          stopInternalHandler();
        }, TIMER_INTERVAL_MS)
      } else {
        log("Stopping immediately...");
        stopInternalHandler();
      }
    };

    function updateTravelProgressState(travelInfo: TravelInfo) {
      const resourcesAmountSpentThisTravel =
        form.resourceUsed === "preferTicket"
          ? travelInfo.ticketCost
          : travelInfo.currencyCost;

      travelledDistanceKm += travelInfo.distanceKm;
      setTravelProgressState((state) => {
        if (state) {
          return {
            ...state,
            travelledDistanceKm: travelledDistanceKm,
            travelsCompleted: state.travelsCompleted + 1,
            resourcesSpent: {
              amount:
                state.resourcesSpent.amount + resourcesAmountSpentThisTravel,
              unit: state.resourcesSpent.unit
            }
          };
        }
        return state;
      });
    }

    const callbackLogic = async () => {
      if (shouldStopRef.current) {
        await handleStop();
        return;
      }
      let travelInfo = await executeTravel(nextTargetRegionId, form, countriesCache);
      updateTravelProgressState(travelInfo);

      nextTargetRegionId =
        nextTargetRegionId === currentTravelRoute.regionIdA
          ? currentTravelRoute.regionIdB
          : currentTravelRoute.regionIdA;

      if (travelledDistanceKm >= Number(form.targetDistanceKm)) {
        await handleStop();
      }
    };

    const callback = async () => {
      try {
        await callbackLogic();
      } catch (e: any) {
        setErrors((errors) => [...errors, e]);
        error(e);
        try {
          await handleStop(e.message);
        } catch (e2: any) {
          setErrors((errors) => [...errors, e2]);
          error(e2);
        }
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

  const onErrorClose = () => {
    setErrors([]);
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
      {errors.length > 0 && (
        <ErrorPanel onClose={onErrorClose} errors={errors} />
      )}
    </>
  );
};
