import { createFeature } from "../../utils/feature";
import * as InventoryJson from "../../requests/inventory-json-data-request";
import {
  SideInventory,
  sideInventoryMountOptions,
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
  execute: async ({ mount }) => {
    const response = await InventoryJson.sendRequest();
    const items = response.flatMap((group) => group.items);

    const filteredItems = items
      .filter((item) => item.type && !typesToSkip.has(item.type))
      .filter((item) => !item.attributes?.inProduction);

    mount(
      <SideInventory items={filteredItems} />,
      document.querySelector("#container"),
      sideInventoryMountOptions,
    );
  },
});
