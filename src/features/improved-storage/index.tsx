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
} from "./components/TotalLabel";
import { renderElement, renderElementWithRoot } from "../../utils/render";
import { ExternalProperty } from "../../hooks/external-property";
import ItemGroup = InventoryJsonData.ItemGroups;
import Item = InventoryJsonData.Item;
import { retry } from "../../utils/time";
import { AnchorHTMLAttributes } from "react";
import { ItemsSectionToggle } from "./components/ItemsSectionToggle";

export const ImprovedStorage = createFeature({
  name: "Improved Storage",
  canExecute: (url) => url.includes("/main/inventory"),
  execute: async () => {
    /**
     * All the styles are loaded and applied immediately for all the views.
     * Adding this class make these static styles scoped, so that they only apply to this view.
     */
    document.body.classList.add("su-improved-storage");

    // order matters here
    displayTotalPriceOnSellOffer();
    applyMaxItemsOnSellOffer();
    autoOpenSellTab();
    makeSectionsToggleable();
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

async function applyMaxItemsOnSellOffer() {
  const storageController =
    getAngularjsControllerScope<any>("StorageController");
  const sellItemsController = getAngularjsControllerScope<SellItemsController>(
    "ErpkSellItemsController",
  );

  console.log({
    storageController,
    sellItemsController,
  });

  const itemsCache = await retry(() =>
    buildItemsCache(storageController.inventory.items),
  );

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
    },
    "before",
  );
  
  // Autofill Food Q1
  // @ts-ignore
  sellItemsController.onProductChange(1,1)
}

function displayTotalPriceOnSellOffer() {
  const sellItemsController = getAngularjsControllerScope<SellItemsController>(
    "ErpkSellItemsController",
  );

  const totalProperty = new ExternalProperty<number>(0);
  renderElementWithRoot(
    <TotalLabel total={totalProperty} />,
    createTotalLabelRootElement(),
  ).after(document.querySelector("#sell_offers th.offers_quantity>input"));

  wrapAngularjsCallback(
    sellItemsController,
    "onProductChange",
    function (this: SellItemsController) {
      const total =
        (this.inputs.quantity ?? 0) * (this.inputs.pricePerUnit ?? 0);
      totalProperty.update(total);
    },
    "after",
  );
}

async function autoOpenSellTab() {
  await retry(() => {
    const sellTab = document.querySelector<HTMLAnchorElement>("#inventory_sell");
    if (!sellTab) {
      throw new Error("Sell tab not found");
    }
    sellTab.click();
  });
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

function makeSectionsToggleable() {
  const inventoryItems  = document.querySelectorAll<HTMLDivElement>("#inventoryItems > div")
  
  inventoryItems.forEach((item) => {
    // We care only about the ng-repeat sections
    if (!item.getAttribute("ng-repeat")) {
      return;
    }
    renderElement(<ItemsSectionToggle sectionId={item.id} />)
      .after(item.querySelector(".section_separator > .top_left > div") as HTMLDivElement);
  })
}