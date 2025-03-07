import { createFeature } from "../../utils/feature";
import "./StaticStyles.scss";
import {
  executeInAngularScope,
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
import { retry, retryNullish, waitFor } from "../../utils/time";
import { ItemsSectionToggle } from "./components/ItemsSectionToggle";
import { TotalFood } from "./components/TotalFood";
import { InventoryJson } from "../../requests/inventory-json-data-request";
import ItemGroup = InventoryJson.ItemGroup;
import Item = InventoryJson.Item;
import { LegacyStorageSettings } from "../../utils/legacy-storage-settings";

export const ImprovedStorage = createFeature({
  id: "improved_storage",
  name: "Improved Storage",
  canExecute: (url) => url.href.includes("/main/inventory"),
  isSettingEnabled: () => LegacyStorageSettings.isImproveInventoryEnabled(),
  execute: async () => {
    // when the extension is being loaded on the inventory page, the main storage may not be loaded yet
    await retryNullish(() => document.querySelector("#mainStorage"), "Main storage not found",20, 100);
    /**
     * All the styles are loaded and applied immediately for all the views.
     * Adding this class make these static styles scoped, so that they only apply to this view.
     */
    document.body.classList.add("su-improved-storage");

    makeSectionsToggleable();
    displayTotalFood();

    await retryNullish(
      () => document.querySelector("#sell_offers .offers_product"),
      "Sell offers not found",
      20,
      100,
    );
    // order matters start
    displayTotalPriceOnSellOffer();
    applyMaxItemsOnSellOffer();
    // order matters end

    autoOpenSellTab();
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
  executeInAngularScope(() => {
    // @ts-ignore
    sellItemsController.onProductChange(1, 1);
  });
}

async function displayTotalPriceOnSellOffer() {
  const sellItemsController = getAngularjsControllerScope<SellItemsController>(
    "ErpkSellItemsController",
  );

  const totalProperty = new ExternalProperty<number>(0);
  renderElementWithRoot(
    <TotalLabel total={totalProperty} />,
    createTotalLabelRootElement(),
  ).after(document.querySelector("#sell_offers th.offers_quantity>input"));

  const offersQuantityInput = await retryNullish(() =>
    document.querySelector<HTMLInputElement>(
      "#sell_offers .offers_quantity input",
    ),
    "Offers quantity input not found",
  );
  const pricePerUnitInput = await retryNullish(() =>
    document.querySelector<HTMLInputElement>(
      "#sell_offers .offers_price input",
    ),
    "Price per unit input not found",
  );

  offersQuantityInput.addEventListener("input", updateTotalPrice);
  pricePerUnitInput.addEventListener("input", updateTotalPrice);

  function updateTotalPrice() {
    const total =
      Number(offersQuantityInput?.value ?? 0) *
      Number(pricePerUnitInput?.value ?? 0);
    console.log(
      offersQuantityInput?.value,
      pricePerUnitInput?.value,
    );
    console.log("Total price", total);
    totalProperty.update(total);
  }

  wrapAngularjsCallback(
    sellItemsController,
    "onProductChange",
    function (this: SellItemsController) {
      updateTotalPrice();
    },
    "after",
  );
  
  waitFor(1).then(() => {
    updateTotalPrice();
  });
}

async function autoOpenSellTab() {
  await retry(() => {
    const sellTab =
      document.querySelector<HTMLAnchorElement>("#inventory_sell");
    if (!sellTab) {
      throw new Error("Sell tab not found");
    }
    if (sellTab.classList.contains("down")) {
      return;
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
  const inventoryItems = document.querySelectorAll<HTMLDivElement>(
    "#inventoryItems > div",
  );

  inventoryItems.forEach((item) => {
    // We care only about the ng-repeat sections
    if (!item.getAttribute("ng-repeat")) {
      return;
    }

    const isOpened = item.id !== "assembly";

    renderElement(
      <ItemsSectionToggle sectionId={item.id} initialIsOpened={isOpened} />,
    ).after(
      item.querySelector(
        ".section_separator > .top_left > div",
      ) as HTMLDivElement,
    );
  });
}

async function displayTotalFood() {
  const storageController =
    getAngularjsControllerScope<any>("StorageController");

  let totalFoodEnergy = 0;
  await retry(() => {
    totalFoodEnergy = 0;
    storageController.inventory.items.forEach((group: any) => {
      group.items.forEach((item: any) => {
        if (item.type === "food") {
          // For some reason the energy string ("+2") has some weird bytes around it
          // bytes: [ 226, 129, 160, 43, 50, 226, 129, 160 ], where 43 is "+" and 50 is "2"
          // the regex below removes these bytes, so that it can be nicely parsed to a number
          const energyWithoutHiddenSpaces = item.attributes.energy.replace(
            /[\u2060]/g,
            "",
          );
          totalFoodEnergy +=
            (item.attributes.storage ?? 0) * energyWithoutHiddenSpaces;
        }
      });
    });
  });

  renderElement(<TotalFood totalEnergy={totalFoodEnergy} />).before(
    document.querySelector(
      "#mainStorage >.section_separator > .top_right > .used_storage_wrapper",
    ),
  );
}
