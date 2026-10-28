import React from "react";
import styles from "./AchievementsSummary.module.scss";
import { getErepublikToolsUrl } from "../profile-page";

/** The total of the achievements and a link to more stats, next to the achievements title. */
export const AchievementsSummary: React.FC<{
  total: number;
  citizenId: number;
}> = ({ total, citizenId }) => (
  <>
    {` (${total})`}
    <a
      className={styles.ToolsLink}
      href={getErepublikToolsUrl(citizenId)}
      title="Click for more stats"
    >
      eRepublik<span>.tools</span>
    </a>
  </>
);
