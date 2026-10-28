import { createFeature } from "../../utils/feature";
import { onXhrLoad } from "../../utils/xhr";
import { error } from "../../utils/utils";
import { MountGroup } from "../improved-marketplace/mount-group";
import { findMarketRegion } from "../improved-marketplace/travel-to-market";
import {
  ErepublikToolsLink,
  erepublikToolsLinkMountOptions,
} from "../improved-marketplace/components/ErepublikToolsLink";
import {
  TravelToMarketButton,
  travelToMarketButtonMountOptions,
} from "../improved-marketplace/components/TravelToMarketButton";
import { findBestJobOffer } from "../best-job-offer/best-job-offer";
import { SalaryLimit, salaryLimitMountOptions } from "./components/SalaryLimit";
import styles from "./JobMarket.module.scss";

/** The Angular scope of `#job_market`. */
interface JobMarketScope {
  data?: { isFromThisCountry?: boolean };
  settings?: { currentCountryId?: number | string };
}

/** The Angular scope of an offer's row. */
interface JobOfferScope {
  job?: { netSalary: number; salaryLimit: number };
}

export const JobMarketFeature = createFeature({
  id: "job_market",
  name: "Job Market",
  description:
    "Adds an eRepublik.tools link, the daily salary limits, the best net salary and travelling to the market.",
  canExecute: (url) => url.pathname.includes("/economy/job-market"),
  execute: (context) => {
    const group = new MountGroup(context);
    context.onCleanup(clearBestNetSalary);

    onXhrLoad(
      "job-market-json",
      () => {
        improveJobMarket(group).catch((e) =>
          error("Failed to improve the job market", e),
        );
      },
      { signal: context.signal },
    );
    return improveJobMarket(group);
  },
});

async function improveJobMarket(group: MountGroup) {
  const isCurrent = group.clear();
  clearBestNetSalary();
  const jobMarket = document.querySelector("#job_market");
  if (!jobMarket) {
    return;
  }
  const title = jobMarket.querySelector("h1");
  if (title) {
    group.mount(
      <ErepublikToolsLink path="marketplace/jobs/0/offers" />,
      title,
      erepublikToolsLinkMountOptions("wide"),
    );
  }
  showOffersDetails(group);

  const scope = angular.element(jobMarket).scope() as
    | JobMarketScope
    | undefined;
  const countryId = Number(scope?.settings?.currentCountryId);
  if (!title || !scope?.data || scope.data.isFromThisCountry || !countryId) {
    return;
  }
  const region = await findMarketRegion(countryId);
  if (!region || !isCurrent()) {
    return;
  }
  group.mount(
    <TravelToMarketButton countryId={countryId} region={region} />,
    title,
    travelToMarketButtonMountOptions("title"),
  );
}

function showOffersDetails(group: MountGroup) {
  const offers = [...document.querySelectorAll(".salary_sorted tr")].flatMap(
    (row) => {
      const job = (angular.element(row).scope() as JobOfferScope | undefined)
        ?.job;
      return job ? [{ row, ...job }] : [];
    },
  );

  for (const { row, salaryLimit } of offers) {
    const salary = row.querySelector(".jm_salary");
    if (salary) {
      group.mount(
        <SalaryLimit salaryLimit={salaryLimit} />,
        salary,
        salaryLimitMountOptions,
      );
    }
  }
  findBestJobOffer(offers)
    ?.row.querySelector(".jm_net_salary")
    ?.classList.add(styles.BestNetSalary);
}

function clearBestNetSalary() {
  document
    .querySelectorAll(`.${styles.BestNetSalary}`)
    .forEach((element) => element.classList.remove(styles.BestNetSalary));
}
