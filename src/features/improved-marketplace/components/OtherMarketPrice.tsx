import type { MountOptions } from "../../../utils/render";
import styles from "./OtherMarketPrice.module.scss";

export const otherMarketPriceMountOptions: MountOptions = {
  tagName: "span",
  position: "append",
  className: styles.Root,
};

interface OtherMarketPriceProps {
  countryId: number;
  countryName: string;
  /** Cheapest price with taxes, undefined without offers. */
  price: number | undefined;
  currency: string;
}

/** The cheapest price of the same product in another market, a click shows that market. */
export const OtherMarketPrice = (props: OtherMarketPriceProps) => {
  function showMarket() {
    document
      .querySelectorAll<HTMLSelectElement>("#countryId")
      .forEach((select) => {
        select.value = String(props.countryId);
        select.dispatchEvent(new Event("change"));
      });
  }

  return (
    <a className={styles.OtherMarket} onClick={showMarket}>
      {props.countryName}
      <span className={styles.Price}>
        {props.price === undefined
          ? "No offers"
          : `${props.price.toFixed(2)}${props.currency}`}
      </span>
    </a>
  );
};
