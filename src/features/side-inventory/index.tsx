import { createFeature } from "../../utils/feature";
import { InventoryJson } from "../../requests/inventory-json-data-request";
import { renderElementWithRoot } from "../../utils/render";
import {
  createSideInventoryRootElement,
  SideInventory,
} from "./components/SideInventory";
import { LegacyStorageSettings } from "../../utils/legacy-storage-settings";

const typesToSkip = new Set([
  "currency",
  "vehicle_blueprint",
  // "booster"
]);

export const SideInventoryFeature = createFeature({
  id: "side_inventory",
  name: "Side Inventory",
  // Everywhere apart from the storage page itself
  canExecute: (url) => !url.href.includes("/main/inventory"),
  isSettingEnabled: () => LegacyStorageSettings.isSideInventoryEnabled(),
  execute: async () => {
    const response = await InventoryJson.sendRequest({});
    const items = response.flatMap((group) => group.items);

    const filteredItems = items
      .filter((item) => item.type && !typesToSkip.has(item.type))
      .filter((item) => !item.attributes?.inProduction);

    renderElementWithRoot(
      <SideInventory items={filteredItems} />,
      createSideInventoryRootElement(),
    ).after(document.querySelector("#container"));
  },
});
