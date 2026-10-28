import type { MountOptions } from "../../../utils/render";
import styles from "./ShowAllOffersLink.module.scss";
import type { MarketSelection } from "../marketplace";

export const showAllOffersLinkMountOptions: MountOptions = {
  tagName: "span",
  className: styles.Root,
};

/** Leaves the page of a shared offer for all the offers of that market. */
export const ShowAllOffersLink = ({
  countryId,
  industryId,
  quality,
}: MarketSelection) => (
  <a
    className="std_global_btn smallSize blueColor"
    href={`/${erepublik.settings.culture}/economy/marketplace#${countryId}/${industryId}/${quality}`}
  >
    Show all offers
  </a>
);
