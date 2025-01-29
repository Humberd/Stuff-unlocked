import { createFeature } from "../../utils/feature";
import { InventoryJson } from "../../requests/inventory-json-data-request";
import { renderElementWithRoot } from "../../utils/render";
import {
  createSideInventoryRootElement,
  SideInventory,
} from "./components/SideInventory";

const typesToSkip = new Set([
  "currency",
  "vehicle_blueprint",
  // "booster"
]);

export const SideInventoryFeature = createFeature({
  name: "Side Inventory",
  // Everywhere apart from the storage page itself
  canExecute: (url) => !url.includes("/main/inventory"),
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
