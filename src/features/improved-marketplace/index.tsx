import { createFeature, runIndependently } from "../../utils/feature";
import { isSettingEnabled } from "../../settings/stuff-settings";
import { onXhrLoad } from "../../utils/xhr";
import { error } from "../../utils/utils";
import { getCitizen, getCountryName } from "../../utils/erep-global-info";
import * as MarketPicture from "../../requests/market-picture-request";
import { MountGroup } from "./mount-group";
import {
  FOOD_INDUSTRY_ID,
  getComparedCountryId,
  getCostPerHealthPoint,
  getMarketSelection,
  type MarketplaceScope,
  type MarketSelection,
} from "./marketplace";
import { findMarketRegion } from "./travel-to-market";
import {
  ErepublikToolsLink,
  erepublikToolsLinkMountOptions,
} from "./components/ErepublikToolsLink";
import {
  OtherMarketPrice,
  otherMarketPriceMountOptions,
} from "./components/OtherMarketPrice";
import {
  TravelToMarketButton,
  travelToMarketButtonMountOptions,
} from "./components/TravelToMarketButton";
import {
  CostPerHealthPoint,
  costPerHealthPointMountOptions,
} from "./components/CostPerHealthPoint";
import {
  ShowAllOffersLink,
  showAllOffersLinkMountOptions,
} from "./components/ShowAllOffersLink";

/** Product data the marketplace page defines. */
const page = window as unknown as {
  industryJSON?: Record<
    string,
    { attributes?: Record<string, { effect?: number } | undefined> } | undefined
  >;
};

type MarketPictures = Map<number, Promise<MarketPicture.Response>>;

export const ImprovedMarketplaceFeature = createFeature({
  id: "improved_marketplace",
  name: "Improved Marketplace",
  description:
    "Adds an eRepublik.tools link, the cheapest price in another market, travelling to the market and the price per health point of food.",
  canExecute: (url) => url.pathname.includes("/economy/marketplace"),
  isSettingEnabled: () => isSettingEnabled("improveMarketplace"),
  execute: (context) => {
    const group = new MountGroup(context);
    const marketPictures: MarketPictures = new Map();

    // The market shown changes without a navigation, every change loads it again
    onXhrLoad(
      "economy/marketplace",
      () => {
        improveMarketplace(group, marketPictures).catch((e) =>
          error("Failed to improve the marketplace", e),
        );
      },
      { signal: context.signal },
    );
    // A shared offer's page has it already
    return improveMarketplace(group, marketPictures);
  },
});

async function improveMarketplace(
  group: MountGroup,
  marketPictures: MarketPictures,
) {
  const isCurrent = group.clear();
  const marketplace = document.querySelector("#marketplace");
  if (!marketplace) {
    return;
  }
  const selection = getMarketSelection(
    angular.element(marketplace).scope() as MarketplaceScope | undefined,
  );
  if (!selection) {
    return;
  }
  const title = marketplace.querySelector("h1");

  if (title) {
    group.mount(
      <ErepublikToolsLink
        path={`marketplace/items/0/${selection.industryId}/${selection.quality}/offers`}
      />,
      title,
      erepublikToolsLinkMountOptions("wide"),
    );
  }
  if (selection.industryId === FOOD_INDUSTRY_ID) {
    showCostPerHealthPoint(group, marketplace, selection);
  }

  await runIndependently([
    () =>
      selection.isSharedOffer
        ? showAllOffersLinks(group, selection)
        : showOtherMarketPrice(
            group,
            isCurrent,
            title,
            selection,
            marketPictures,
          ),
    () =>
      selection.needsTravelToBuy &&
      showTravelToMarket(group, isCurrent, selection),
  ]);
}

function showAllOffersLinks(group: MountGroup, selection: MarketSelection) {
  document.querySelectorAll(".list_products").forEach((list) => {
    group.mount(
      <ShowAllOffersLink {...selection} />,
      list,
      showAllOffersLinkMountOptions,
    );
  });
}

async function showOtherMarketPrice(
  group: MountGroup,
  isCurrent: () => boolean,
  title: Element | null,
  selection: MarketSelection,
  marketPictures: MarketPictures,
) {
  const citizen = getCitizen();
  const countryId = getComparedCountryId(selection.countryId, citizen);
  if (!title || countryId === undefined) {
    return;
  }
  // Mounted right away to stay next to the eRepublik.tools link
  const otherMarket = group.mount(null, title, otherMarketPriceMountOptions);

  const offer = MarketPicture.findCheapestOffer(
    await getMarketPicture(countryId, marketPictures),
    selection.industryId,
    selection.quality,
  );
  if (!isCurrent()) {
    return;
  }
  otherMarket.render(
    <OtherMarketPrice
      countryId={countryId}
      countryName={getCountryName(countryId) ?? `Country ${countryId}`}
      price={offer?.gross}
      currency={citizen.currency}
    />,
  );
}

function getMarketPicture(
  countryId: number,
  marketPictures: MarketPictures,
): Promise<MarketPicture.Response> {
  let marketPicture = marketPictures.get(countryId);
  if (!marketPicture) {
    marketPicture = MarketPicture.sendRequest(countryId);
    marketPictures.set(countryId, marketPicture);
    // Asked again next time
    void marketPicture.catch(() => marketPictures.delete(countryId));
  }
  return marketPicture;
}

async function showTravelToMarket(
  group: MountGroup,
  isCurrent: () => boolean,
  { countryId }: MarketSelection,
) {
  const filters = document.querySelector("#filters_expanded");
  if (!filters) {
    return;
  }
  const region = await findMarketRegion(countryId);
  if (!region || !isCurrent()) {
    return;
  }
  group.mount(
    <TravelToMarketButton countryId={countryId} region={region} />,
    filters,
    travelToMarketButtonMountOptions("filters"),
  );
}

function showCostPerHealthPoint(
  group: MountGroup,
  marketplace: Element,
  { industryId, quality }: MarketSelection,
) {
  const energyPerFood =
    page.industryJSON?.[industryId]?.attributes?.[quality]?.effect;
  if (!energyPerFood) {
    return;
  }
  marketplace.querySelectorAll(".price_sorted tr .m_price").forEach((price) => {
    const cost = getCostPerHealthPoint(
      parseFloat(price.textContent ?? ""),
      energyPerFood,
    );
    if (cost !== undefined) {
      group.mount(
        <CostPerHealthPoint cost={cost} />,
        price,
        costPerHealthPointMountOptions,
      );
    }
  });
}
