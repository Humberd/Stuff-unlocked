import { createFeature } from "../../utils/feature";
import "./StaticStyles.scss";
import {
  getAngularjsControllerScope,
  wrapAngularjsCallback,
} from "../../angularjs-utils";
import { log } from "../../utils/utils";
import {
  createTotalLabelRootElement,
  TotalLabel,
  TotalLabelProps,
} from "./components/TotalLabel";
import ItemGroup = InventoryJsonData.ItemGroups;
import Item = InventoryJsonData.Item;
import { renderElement, renderElementWithRoot } from "../../utils/render";

export const ImprovedStorage = createFeature({
  name: "Improved Storage",
  canExecute: (url) => url.includes("/main/inventory"),
  execute: async () => {
    /**
     * All the styles are loaded and applied immediately for all the views.
     * Adding this class make these static styles scoped, so that they only apply to this view.
     */
    document.body.classList.add("su-improved-storage");

    applyMaxItemsOnSellOffer();
  },
});

interface SellItemsController {
  inputs: {
    countryLicense: unknown;
    pricePerUnit: number | null;
    quantity: number | null;
    selectedCountry: number | null;
    selectedIndustry: number | string | null;
    selectedQuality: number | string | null;
  };
}

function applyMaxItemsOnSellOffer() {
  const storageController =
    getAngularjsControllerScope<any>("StorageController");
  const sellItemsController = getAngularjsControllerScope<SellItemsController>(
    "ErpkSellItemsController",
  );

  console.log({
    storageController,
    sellItemsController,
  });

  const itemsCache = buildItemsCache(storageController.inventory.items);

  console.log(document.querySelector("#sell_offers th.offers_quantity>input"));

  renderElementWithRoot(
    <TotalLabel total={0} />,
    createTotalLabelRootElement(),
  ).after(document.querySelector("#sell_offers th.offers_quantity>input"));

  wrapAngularjsCallback(
    sellItemsController,
    "onProductChange",
    function (this: SellItemsController, industryId: number, quality: number) {
      const item = itemsCache.get(`${industryId}_${quality}`);
      if (!item) {
        log(`Item not found in cache: ${industryId}_${quality}`, itemsCache);
        return;
      }

      this.inputs.quantity = item.amountForSale ?? 1;
      const total = this.inputs.quantity * (this.inputs.pricePerUnit ?? 0);
    },
    "before",
  );
}

function buildItemsCache(itemGroups: ItemGroup[]): Map<string, Item> {
  const itemsCache = new Map<string, Item>();
  for (const group of itemGroups) {
    for (const item of group.items) {
      if (!item.id) {
        continue;
      }

      let id = item.id;
      if (id.startsWith("raw_")) {
        id = id.replace("raw_", "");
      }

      itemsCache.set(id, item);
    }
  }
  return itemsCache;
}
