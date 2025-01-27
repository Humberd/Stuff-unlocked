import { createFeature } from "../../utils/feature";
import "./StaticStyles.scss";

export const ImprovedStorage = createFeature({
  name: "Improved Storage",
  canExecute: (url) => url.includes("/main/inventory"),
  execute: async () => {
    /**
     * All the styles are loaded and applied immediately for all the views.
     * Adding this class make these static styles scoped, so that they only apply to this view.
     */
    document.body.classList.add("su-improved-storage")
  },
});

