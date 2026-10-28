import type { MountOptions } from "../../../utils/render";
import type { JobOffer } from "../../../requests/job-market-json-request";
import { formatNumber } from "../../../utils/format";
import { describeSalaryLimit } from "../best-job-offer";
import styles from "./BestJobOfferLink.module.scss";

export const bestJobOfferLinkMountOptions: MountOptions = {
  tagName: "span",
  position: "append",
  className: styles.Root,
};

interface BestJobOfferLinkProps {
  offer: JobOffer;
  countryId: number;
}

export const BestJobOfferLink = ({
  offer,
  countryId,
}: BestJobOfferLinkProps) => (
  <a href={`/${erepublik.settings.culture}/economy/job-market/${countryId}`}>
    Highest local offer: net {formatNumber(offer.netSalary)}cc (
    {describeSalaryLimit(offer.salaryLimit)})
  </a>
);
