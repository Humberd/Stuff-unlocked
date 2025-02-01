import React, { useState } from "react";
import styles from "./VipStatus.module.scss";
import { formatNumber } from "../../../utils/format";
import { Button } from "../../../common-components/button/Button";
import { waitFor } from "../../../utils/time";

interface VipStatusProps {
  level: number;
  currentPoints: number;
  totalPoints: number;
  isClaimed: boolean;
}

export const VipStatus: React.FC<VipStatusProps> = (props) => {
  const [isClaimingLoading, setIsClaimingLoading] = useState(false);
  const [isClaimedByButton, setIsClaimedByButton] = useState(false);

  const handleClaim = async () => {
    setIsClaimingLoading(true);
    await waitFor(2000);
    setIsClaimedByButton(true);
    // await VipClaim.sendRequest({});
    setIsClaimingLoading(false);
  };

  function renderClaimButton() {
    if (props.isClaimed) {
      return;
    }
    if (isClaimedByButton) {
      return <Button disabled>✔️ Claimed</Button>;
    }

    if (isClaimingLoading) {
      return <Button disabled>Claiming...</Button>;
    }

    return <Button onClick={handleClaim}>Claim VIP Points</Button>;
  }

  return (
    <div className={styles.VipStatus}>
      <div className={styles.MainRow} title={`VIP Level ${props.level}`}>
        <img
          className={styles.Image}
          src="https://www.erepublik.net/images/top_customers/vip_icon.png"
          alt="Vip status"
        />
        <strong className={styles.MainText}>
          {formatNumber(props.currentPoints)} /{" "}
          {formatNumber(props.totalPoints)}
        </strong>
      </div>
      <div className={styles.SupportingRow}>{renderClaimButton()}</div>
    </div>
  );
};
