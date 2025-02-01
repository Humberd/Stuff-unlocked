import React, { useState } from "react";
import styles from "./VipStatus.module.scss";
import { formatNumber } from "../../../utils/format";
import { Button } from "../../../common-components/button/Button";
import { VipClaim } from "../../../requests/vip-claim-request";
import { getCsrfToken } from "../../../utils/erep-global-info";

interface VipStatusProps {
  level: number;
  currentPoints: number;
  totalPoints: number;
  isClaimed: boolean;
}

export const VipStatus: React.FC<VipStatusProps> = (props) => {
  const [claimStatus, setClaimStatus] = useState<string | null>(null);

  const handleClaim = async () => {
    setClaimStatus("Claiming...")
    const response = await VipClaim.sendRequest({
      _token: getCsrfToken(),
    });
    if (response.error) {
      console.error("Failed to claim VIP points", response.message);
      setClaimStatus(response.message);
      return;
    }
    setClaimStatus("✔️ Claimed");
  };

  function renderClaimButton() {
    if (props.isClaimed) {
      return;
    }
    if (claimStatus) {
      return <Button disabled>{claimStatus}</Button>;
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
