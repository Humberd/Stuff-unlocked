import { createFeature } from "../../utils/feature";
import { CountriesCache } from "./countries-cache";
import { AutoTravellerPanel } from "./components/AutoTravellerPanel";
import { renderElement } from "../../utils/render";
import { CollapseButtonPanel } from "./components/CollapseButtonPanel";
import { TravelProgressPanel } from "./components/TravelProgressPanel";
import { executeTravel } from "./travel";
import { getCitizenshipCurrencyName } from "../../utils/erep-global-info";
import { travelRouteMain } from "./regions";
import { ErrorPanel } from "./components/ErrorPanel";
import { useLocalStorage } from "../../hooks/storage";
import { useExternalProperty } from "../../hooks/external-property";
import { waitFor } from "../../utils/time";
import { AutoTraveller } from "./auto-traveller";

export const AnAmazingJourneyFeature = createFeature({
  id: "amazing_journey",
  name: "An Amazing Journey",
  description:
    "An Amazing Journey is a feature where you auto travel between 2 locations to maximize efficiency of a distance travel.",
  canExecute: (url) => url.href.includes("/main/anniversaryQuest"),
  execute: () => {
    const countriesCache = new CountriesCache();
    const autoTraveller = new AutoTraveller(travelRouteMain, {
      getCurrentRegionId: () =>
        countriesCache.getCurrentRegionId({ skipCache: true }),
      travel: (regionId, form) => executeTravel(regionId, form, countriesCache),
      getCurrencyName: getCitizenshipCurrencyName,
      sleep: waitFor,
    });

    renderElement(
      <JourneyFeatureComponent autoTraveller={autoTraveller} />,
    ).before(document.querySelector("#cityInfoTopPopup"));
  },
});

interface JourneyFeatureComponentProps {
  autoTraveller: AutoTraveller;
}

const JourneyFeatureComponent = ({
  autoTraveller,
}: JourneyFeatureComponentProps) => {
  const [isCollapsed, setIsCollapsed] = useLocalStorage(
    "AnAmazingJourney.isCollapsed",
    false,
  );
  const state = useExternalProperty(autoTraveller.state);
  const progress = useExternalProperty(autoTraveller.progress);
  const errors = useExternalProperty(autoTraveller.errors);

  return (
    <>
      <CollapseButtonPanel isCollapsed={isCollapsed} onClick={setIsCollapsed} />
      {!isCollapsed && (
        <AutoTravellerPanel
          onStart={(form) => void autoTraveller.start(form)}
          onStop={() => autoTraveller.stop()}
          state={state}
        />
      )}
      {!isCollapsed && progress && <TravelProgressPanel state={progress} />}
      {errors.length > 0 && (
        <ErrorPanel
          onClose={() => autoTraveller.clearErrors()}
          errors={errors}
        />
      )}
    </>
  );
};
