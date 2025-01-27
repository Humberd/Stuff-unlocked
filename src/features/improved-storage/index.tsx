import { createFeature } from "../../utils/feature";
import "./StaticStyles.scss";

export const ImprovedStorage = createFeature({
  name: "Improved Storage",
  canExecute: (url) => url.includes("/main/inventory"),
  execute: async () => {
    document.body.classList.add("su-improved-storage")
  },
});

