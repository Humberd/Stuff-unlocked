import { createFeature, type FeatureContext } from "../../utils/feature";
import { isSettingEnabled } from "../../settings/stuff-settings";
import { onXhrLoad } from "../../utils/xhr";
import { waitForElement } from "../../utils/dom";
import { error, log } from "../../utils/utils";
import { getCitizen } from "../../utils/erep-global-info";
import { parseFormattedNumber } from "../../utils/format";
import { ExternalProperty } from "../../hooks/external-property";
import { MountGroup } from "../improved-marketplace/mount-group";
import { getGoldPrice } from "./gold-price";
import { getNetPrice } from "./net-price";
import {
  findTaxes,
  getFormUnitTaxes,
  type SellOffersScope,
  type UnitTaxes,
} from "./sell-offers-scope";
import {
  UnitTaxesInfo,
  unitTaxesInfoMountOptions,
} from "./components/UnitTaxesInfo";
import { OfferNet, offerNetMountOptions } from "./components/OfferNet";
import {
  TotalNet,
  totalNetCellMountOptions,
  TotalNetFooter,
  totalNetFooterMountOptions,
  TotalNetHeader,
  totalNetHeaderMountOptions,
} from "./components/TotalNet";
import "./StaticStyles.scss";

const BODY_CLASS = "su-sell-offers-net-price";
const QUANTITY_MAX_LENGTH = "9";
const PAGE_LOAD_TIMEOUT_MS = 10_000;

export const SellOffersNetPriceFeature = createFeature({
  id: "sell_offers_net_price",
  name: "Sell Offers Net Price",
  description:
    "Shows the tax and net price in the sell form, and the net of every offer in the currency and in gold.",
  canExecute: (url) =>
    url.pathname.includes("/main/inventory") ||
    url.pathname.includes("/economy/inventory"),
  isSettingEnabled: () => isSettingEnabled("improveInventory"),
  execute: async (context) => {
    try {
      await waitForElement(
        "#sell_offers th.offers_price",
        PAGE_LOAD_TIMEOUT_MS,
      );
    } catch {
      log("No sell form on this page");
      return;
    }
    document.body.classList.add(BODY_CLASS);
    context.onCleanup(() => document.body.classList.remove(BODY_CLASS));
    limitQuantityLength(context);

    const goldPrice = new ExternalProperty<number | undefined>(undefined);
    getGoldPrice()
      .then((price) => goldPrice.update(price))
      .catch((e) => error("Failed to read the gold price", e));

    const unitTaxes = new ExternalProperty<UnitTaxes | undefined>(undefined);
    const updateUnitTaxes = () =>
      unitTaxes.update(
        getFormUnitTaxes(getSellOffersScope(), getCitizen().country),
      );
    // The form also changes without DOM events, e.g. when a product is
    // picked through Angular, so the scope's inputs are watched instead
    const scope = getSellOffersScope();
    const unwatch = scope?.$watch?.(() => {
      const { pricePerUnit, selectedCountry, selectedIndustry } =
        scope.inputs ?? {};
      return `${pricePerUnit}|${selectedCountry}|${selectedIndustry}`;
    }, updateUnitTaxes);
    if (unwatch) {
      context.onCleanup(unwatch);
    }

    const group = new MountGroup(context);
    const showNetPrices = () => {
      group.clear();
      showUnitTaxes(group, unitTaxes);
      updateUnitTaxes();
      showOffersNet(group, goldPrice);
    };
    onXhrLoad(/myMarketOffers|marketplaceActions/, showNetPrices, {
      signal: context.signal,
    });
    showNetPrices();
  },
});

function getSellOffersScope(): SellOffersScope | undefined {
  return angular.element(document.querySelector("#sell_offers")).scope() as
    | SellOffersScope
    | undefined;
}

function limitQuantityLength({ onCleanup }: FeatureContext) {
  document
    .querySelectorAll<HTMLInputElement>(".offers_quantity input")
    .forEach((input) => {
      const previous = input.getAttribute("maxlength");
      input.setAttribute("maxlength", QUANTITY_MAX_LENGTH);
      onCleanup(() =>
        previous === null
          ? input.removeAttribute("maxlength")
          : input.setAttribute("maxlength", previous),
      );
    });
}

function showUnitTaxes(
  group: MountGroup,
  unitTaxes: ExternalProperty<UnitTaxes | undefined>,
) {
  const priceHint = document.querySelector("#sell_offers .relative small");
  if (priceHint) {
    group.mount(
      <UnitTaxesInfo unitTaxes={unitTaxes} />,
      priceHint,
      unitTaxesInfoMountOptions,
    );
  }
}

function showOffersNet(
  group: MountGroup,
  goldPrice: ExternalProperty<number | undefined>,
) {
  const table = document.querySelector("#sell_offers table");
  const priceHeader = document.querySelector("#sell_offers th.offers_price");
  if (!table || !priceHeader) {
    return;
  }
  group.mount(<TotalNetHeader />, priceHeader, totalNetHeaderMountOptions);

  const scope = getSellOffersScope();
  const { country, currency } = getCitizen();
  let total = 0;
  document
    .querySelectorAll<HTMLElement>("#marketOffers tr")
    .forEach((offer) => {
      const { country_id: countryId, industry_id: industryId } = offer.dataset;
      const taxes = findTaxes(scope, countryId, industryId);
      const price = parseFormattedNumber(
        offer.querySelector(".offer_price strong")?.textContent ?? "",
      );
      const net =
        taxes && price > 0
          ? getNetPrice(price, taxes, Number(countryId) !== country)
          : undefined;
      const offerTotal =
        net === undefined ? undefined : net * Number(offer.dataset.amount ?? 0);
      total += offerTotal ?? 0;

      offer.querySelectorAll(".offer_price").forEach((offerPrice) => {
        if (net !== undefined) {
          group.mount(
            <OfferNet net={net} currency={currency} />,
            offerPrice,
            offerNetMountOptions,
          );
        }
        // An empty cell keeps the columns in line
        group.mount(
          offerTotal !== undefined && (
            <TotalNet
              amount={offerTotal}
              currency={currency}
              goldPrice={goldPrice}
            />
          ),
          offerPrice,
          totalNetCellMountOptions,
        );
      });
    });

  group.mount(
    <TotalNetFooter amount={total} currency={currency} goldPrice={goldPrice} />,
    table,
    totalNetFooterMountOptions,
  );
}
