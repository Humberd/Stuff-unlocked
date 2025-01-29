import { createFeature } from "../../utils/feature";
import { InventoryJson } from "../../requests/inventory-json-data-request";


export const SideInventory = createFeature({
  name: "Side Inventory",
  // Everywhere apart from the storage page itself
  canExecute: (url) => !url.includes("/main/inventory"),
  execute: async () => {

    const response = await InventoryJson.sendRequest({})
    console.log(response)
    
  },
});