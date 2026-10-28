import React from "react";
import styles from "./EpicBattleLink.module.scss";
import * as BattlefieldTravel from "../../../requests/battlefield-travel-request";
import { getCsrfToken } from "../../../utils/erep-global-info";
import { error } from "../../../utils/utils";
import { EPIC, type EpicBattle } from "../find-epic-battle";

export function battlefieldUrl(battleId: number) {
  return `/en/military/battlefield/${battleId}`;
}

export function epicBattleTitle(battle: EpicBattle) {
  return battle.epic === EPIC ? "EPIC BATTLE DETECTED" : "FULL SCALE DETECTED";
}

export const EpicBattleLink: React.FC<{ battle: EpicBattle }> = ({
  battle,
}) => {
  const url = battlefieldUrl(battle.battleId);

  const onClick = async (event: React.MouseEvent) => {
    event.preventDefault();
    try {
      await BattlefieldTravel.sendRequest({
        _token: getCsrfToken(),
        battleId: battle.battleId,
        battleZoneId: battle.battleZoneId,
      });
    } catch (e) {
      error("Failed to move to the battle", e);
    }
    // The battlefield tells what went wrong, if anything did
    location.href = url;
  };

  return (
    <a
      className={styles.Link}
      href={url}
      title={epicBattleTitle(battle)}
      onClick={(event) => void onClick(event)}
    >
      <img
        src={`/images/modules/misc/${battle.epic === EPIC ? "epic_battles_icon" : "full_scale_battle"}.png`}
        alt={epicBattleTitle(battle)}
      />
    </a>
  );
};
