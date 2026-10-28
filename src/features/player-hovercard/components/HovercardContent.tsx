import type { CSSProperties, ReactNode } from "react";
import styles from "./HovercardContent.module.scss";
import {
  describeAirHit,
  describeGroundHit,
  formatStrength,
  getAchievementIcons,
  getActivePacks,
  getBadges,
  getDateLine,
  getMilitaryUnitRole,
  getPartyRole,
  getRankLabel,
  getResidenceStatus,
  getXpBar,
  truncate,
  type HovercardData,
  type ResidenceStatus,
} from "../hovercard-data";
import type * as CitizenProfileJson from "../../../requests/citizen-profile-json-request";

const GREEN = "#83b70b";
const ORANGE = "#fb7e3d";
const BLUE = "#009cff";

const residenceColors: Record<ResidenceStatus, string> = {
  inResidenceRegion: GREEN,
  away: ORANGE,
  noResidence: BLUE,
};

interface HovercardContentProps {
  playerId: string;
  data: HovercardData;
  isContributor: boolean;
  donatorBorderUrl?: string;
}

export function HovercardContent({
  playerId,
  data,
  isContributor,
  donatorBorderUrl,
}: HovercardContentProps) {
  const { profile, hovercard } = data;
  const { citizen, location, military } = profile;
  const xpBar = getXpBar(profile);
  const xpColor = xpBar.isNearLevelUp ? ORANGE : GREEN;

  return (
    <div className={styles.Hovercard}>
      <div className={styles.Header}>
        <div className={styles.Avatar}>
          <img className={styles.AvatarImage} src={citizen.avatar} alt="" />
          {donatorBorderUrl && (
            <img
              className={styles.DonatorBorder}
              src={donatorBorderUrl}
              alt=""
            />
          )}
        </div>
        <div className={styles.Details}>
          <div>
            <span
              className={styles.Title}
              style={progressBackground(xpBar.percent, xpColor, "#505050")}
            >
              {hovercard.level}
            </span>
            <span
              className={`${styles.Title} ${profile.isDictator ? styles.Dictator : ""}`}
            >
              {truncate(citizen.name, 21)}
            </span>
            {citizen.onlineStatus && <span className={styles.OnlineDot} />}
          </div>
          <div>
            {getBadges(data, isContributor).map((badge) => (
              <span
                key={badge.label}
                className={`${styles.Badge} ${badge.isPositive ? "" : styles.NegativeBadge}`}
              >
                {badge.label}
              </span>
            ))}
          </div>
          <div className={styles.Secondary}>{getDateLine(data)}</div>
          <div>
            <Flag country={location.citizenshipCountry} />
            {location.citizenshipCountry.name}
          </div>
          <div>
            <Flag country={location.residenceCountry} />
            {truncate(
              `${location.residenceCountry.name}, ${location.residenceRegion.name}`,
              44,
            )}
            <span
              className={styles.ResidenceIcon}
              style={{ color: residenceColors[getResidenceStatus(profile)] }}
            >
              {""}
            </span>
          </div>
        </div>
        <div className={styles.Fighter}>
          <div>Div: {hovercard.fighterInfo.military.division}</div>
          <div>
            <img
              className={styles.StrengthIcon}
              src="//www.erepublik.net/images/modules/citizenprofile/strength_ico.png"
              alt=""
            />
            {formatStrength(hovercard)}
          </div>
        </div>
        <div className={styles.Packs}>
          {getActivePacks(profile).map((pack) => (
            <div key={pack} className={styles.Pack}>
              {pack}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.Roles}>
        <div className={styles.Column}>
          <RankRow
            rank={military.militaryData.ground}
            label={getRankLabel(military.militaryData.ground, "ground")}
            hit={citizen.is_organization ? "" : describeGroundHit(hovercard)}
          />
          <RankRow
            rank={military.militaryData.aircraft}
            label={getRankLabel(military.militaryData.aircraft, "air")}
            hit={citizen.is_organization ? "" : describeAirHit(hovercard)}
          />
        </div>
        <div className={styles.Column}>
          <Row
            avatar={profile.partyData?.avatar}
            title={getPartyRole(profile)}
            subtitle={profile.partyData?.name ?? "No political party"}
          />
          <Row
            avatar={military.militaryUnit?.avatar}
            title={getMilitaryUnitRole(military.militaryUnit, playerId)}
            subtitle={military.militaryUnit?.name ?? "No military unit"}
          />
        </div>
      </div>
      <div className={styles.Achievements}>
        {getAchievementIcons(profile).map((achievement) => (
          <div key={achievement.iconUrl} className={styles.Achievement}>
            <img
              className={styles.AchievementIcon}
              src={achievement.iconUrl}
              alt=""
            />
            <span>{achievement.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Flag({ country }: { country: CitizenProfileJson.Country }) {
  return (
    <img
      className={styles.Flag}
      src={`//www.erepublik.net/images/flags_png/S/${country.permalink}.png`}
      alt=""
    />
  );
}

function RankRow({
  rank,
  label,
  hit,
}: {
  rank: CitizenProfileJson.Rank;
  label: string;
  hit: string;
}) {
  return (
    <Row
      icon={rank.icon}
      title={
        <span
          className={styles.RankProgress}
          style={progressBackground(rank.progress, BLUE, "#000")}
        >
          {label}
        </span>
      }
      subtitle={hit}
    />
  );
}

function Row({
  icon,
  avatar,
  title,
  subtitle,
}: {
  icon?: string;
  /** Like `icon`, on a white background for transparent images. */
  avatar?: string;
  title: ReactNode;
  subtitle: string;
}) {
  return (
    <div className={styles.Row}>
      {icon && <img className={styles.RowImage} src={icon} alt="" />}
      {avatar && (
        <img
          className={`${styles.RowImage} ${styles.RowAvatar}`}
          src={avatar}
          alt=""
        />
      )}
      <div className={styles.RowText}>
        <div className={styles.RowTitle}>{title}</div>
        <div className={styles.Secondary}>{subtitle}</div>
      </div>
    </div>
  );
}

function progressBackground(
  percent: number,
  color: string,
  background: string,
): CSSProperties {
  return {
    background: `linear-gradient(to right, ${color} ${percent}%, ${background} ${percent}%)`,
  };
}
