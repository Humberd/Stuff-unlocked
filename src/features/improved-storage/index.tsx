import { createFeature } from "../../utils/feature";
import "./StaticStyles.scss";
import ItemGroup = InventoryJsonData.ItemGroups;
import {
  getAngularjsControllerScope,
  wrapAngularjsCallback,
} from "../../angularjs-utils";
import Item = InventoryJsonData.Item;
import { log } from "../../utils/utils";

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

function applyMaxItemsOnSellOffer() {
  const storageController = getAngularjsControllerScope<any>("StorageController");
  const sellItemsController = getAngularjsControllerScope<any>(
    "ErpkSellItemsController",
  );

  console.log({
    storageController,
    sellItemsController,
  });
  
  const itemsCache = buildItemsCache(storageController.inventory.items);

  wrapAngularjsCallback(
    sellItemsController,
    "onProductChange",
    function (this: any, industryId: number, quality: number) {
      const item = itemsCache.get(`${industryId}_${quality}`);
      if (!item) {
        log(`Item not found in cache: ${industryId}_${quality}`, itemsCache);
        return;
      }

      this.inputs.quantity = item.amountForSale ?? 1;
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
