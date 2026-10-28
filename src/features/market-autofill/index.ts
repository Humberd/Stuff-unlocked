import { createFeature } from "../../utils/feature";
import { isSettingEnabled } from "../../settings/stuff-settings";
import { onXhrLoad } from "../../utils/xhr";
import { error } from "../../utils/utils";
import { getCitizen } from "../../utils/erep-global-info";
import * as InventoryHtml from "../../requests/inventory-html-request";
import { getMaxBuyAmount, isRawMaterial } from "./max-amount";

interface MarketplaceScope {
  settings?: { industryId?: number | string };
}

const BUY_FIELD_SELECTOR = ".buyField";

export const MarketAutofillFeature = createFeature({
  id: "market_autofill",
  name: "Market Autofill",
  description:
    "Fills in the most the citizen can buy of each marketplace offer.",
  canExecute: (url) => url.pathname.includes("/economy/marketplace"),
  isSettingEnabled: () => isSettingEnabled("autofillMarket"),
  execute: ({ signal }) => {
    let freeStorage: Promise<number | undefined> | undefined;
    const getFreeStorage = () => (freeStorage ??= loadFreeStorage());

    onXhrLoad(
      "economy/marketplace",
      (_, url) => {
        // A purchase took storage
        if (url.includes("marketplaceActions")) {
          freeStorage = undefined;
        }
        fillMaxAmounts(getFreeStorage).catch((e) =>
          error("Failed to fill in the max amounts", e),
        );
      },
      { signal },
    );
    return fillMaxAmounts(getFreeStorage);
  },
});

async function fillMaxAmounts(
  getFreeStorage: () => Promise<number | undefined>,
) {
  if (!document.querySelector(BUY_FIELD_SELECTOR)) {
    return;
  }
  const freeStorage = await getFreeStorage();
  const scope = angular
    .element(document.querySelector("#marketplace"))
    .scope() as MarketplaceScope | undefined;
  const isRaw = isRawMaterial(Number(scope?.settings?.industryId));
  const { currencyAmount } = getCitizen();

  document
    .querySelectorAll<HTMLInputElement>(BUY_FIELD_SELECTOR)
    .forEach((field) => {
      const pricePerUnit = Number(field.dataset.price);
      if (!(pricePerUnit > 0)) {
        return;
      }
      const offerMaximum = Number(
        field.nextElementSibling?.nextElementSibling?.getAttribute("maximum") ??
          NaN,
      );
      field.value = String(
        getMaxBuyAmount({
          currencyAmount,
          pricePerUnit,
          offerMaximum: Number.isNaN(offerMaximum) ? undefined : offerMaximum,
          freeStorage,
          isRawMaterial: isRaw,
        }),
      );
      field.dispatchEvent(new Event("input"));
    });
}

async function loadFreeStorage(): Promise<number | undefined> {
  try {
    const { current, total } = InventoryHtml.parseUsedStorage(
      await InventoryHtml.sendRequest(),
    );
    return total - current;
  } catch (e) {
    error("Failed to read the free storage, filling in without it", e);
    return undefined;
  }
}
