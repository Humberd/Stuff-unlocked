import { createFeature } from "../../utils/feature";
import "./StaticStyles.scss";

export const ImprovedStorage = createFeature({
  name: "Improved Storage",
  canExecute: (url) => url.includes("/main/inventory"),
  execute: async () => {
    // adding a class only for this view, so that styles won't override anything else on otherviews,
    // because the styles are loaded for all the views
    document.body.classList.add("su-improved-storage")
  },
});

