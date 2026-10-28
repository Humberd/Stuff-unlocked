import { useState } from "react";
import { formatNumber } from "../../../utils/format";
import { error, toError } from "../../../utils/utils";
import type { MountOptions } from "../../../utils/render";
import { type MarketRegion, travelToMarket } from "../travel-to-market";
import styles from "./TravelToMarketButton.module.scss";

export function travelToMarketButtonMountOptions(
  place: "filters" | "title",
): MountOptions {
  return {
    tagName: "span",
    position: "append",
    className: place === "filters" ? styles.FiltersRoot : styles.TitleRoot,
  };
}

interface TravelToMarketButtonProps {
  countryId: number;
  region: MarketRegion;
}

/** Travels to the market's country only when clicked, then reloads the page. */
export const TravelToMarketButton = ({
  countryId,
  region,
}: TravelToMarketButtonProps) => {
  const [isTravelling, setIsTravelling] = useState(false);
  const [failure, setFailure] = useState<string>();

  async function travel() {
    if (isTravelling) {
      return;
    }
    setIsTravelling(true);
    try {
      await travelToMarket(countryId, region);
      window.location.reload();
    } catch (e) {
      error("Failed to travel to the market", e);
      setFailure(toError(e).message);
      setIsTravelling(false);
    }
  }

  return (
    <a
      className="std_global_btn smallSize blueColor"
      title={failure}
      onClick={() => void travel()}
    >
      {failure
        ? "Travel failed"
        : `Travel to market (${formatNumber(region.cost)}cc)`}
    </a>
  );
};
