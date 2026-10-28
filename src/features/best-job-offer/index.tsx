import { createFeature } from "../../utils/feature";
import { isSettingEnabled } from "../../settings/stuff-settings";
import { getCitizen } from "../../utils/erep-global-info";
import * as JobMarketJson from "../../requests/job-market-json-request";
import { findBestJobOffer } from "./best-job-offer";
import {
  BestJobOfferLink,
  bestJobOfferLinkMountOptions,
} from "./components/BestJobOfferLink";

export const BestJobOfferFeature = createFeature({
  id: "best_job_offer",
  name: "Best Job Offer",
  description:
    "Shows the highest net salary offered in the country the citizen is in.",
  canExecute: (url) => url.pathname.includes("/economy/myCompanies"),
  isSettingEnabled: () => isSettingEnabled("showBestJobOffer"),
  execute: async ({ mount }) => {
    const titles = document.querySelectorAll(".employer.fill h4");
    if (titles.length === 0) {
      return;
    }
    const countryId = getCitizen().countryLocationId;
    const { jobs = [] } = await JobMarketJson.sendRequest(countryId);
    const offer = findBestJobOffer(jobs);
    if (!offer) {
      return;
    }
    titles.forEach((title) => {
      mount(
        <BestJobOfferLink offer={offer} countryId={countryId} />,
        title,
        bestJobOfferLinkMountOptions,
      );
    });
  },
});
