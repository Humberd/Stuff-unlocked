import { createFeature } from "../../utils/feature";
import { isOnHomepage } from "../../utils/erep-global-info";
import { renderElement } from "../../utils/render";
import { StorageInfo } from "./components/StorageInfo";

export const MainPageFeature = createFeature({
  name: "Main Page",
  canExecute: (url) => isOnHomepage(),
  execute: async () => {
    renderElement(<StorageInfo current={0} total={0} free={0}/>)
      .after(document.querySelector(".sidebar .currency_amount"));
  },
});