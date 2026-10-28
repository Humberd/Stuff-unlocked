import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./InfluenceCalculator.module.scss";
import { useLocalStorage } from "../../../hooks/storage";
import { getEDay } from "../../../utils/erep-global-info";
import { error } from "../../../utils/utils";
import * as MarketPicture from "../../../requests/market-picture-request";
import type { ProfileMilitaryUnit } from "../../improved-profile/profile-data";
import {
  type CalculatorInputs,
  calculateInfluenceResults,
  formatCompact,
  getLegendBonusPercent,
  type MilitaryKind,
  parseInputNumber,
} from "../influence";
import {
  buildPriceCache,
  getSelectableQualities,
  isPriceCacheFresh,
  type PriceCache,
  PRICES_COUNTRY_ID,
} from "../price-cache";

/** Class of the boxes next to the ranks that show the results. */
export const resultBoxClassName = styles.ResultBox;

export interface ResultBox {
  kind: MilitaryKind;
  container: HTMLElement;
}

interface StoredState {
  /** Stale prices are used until the fresh ones load. */
  prices?: PriceCache;
  selectedQualities: Record<MilitaryKind, number>;
}

const initialStoredState: StoredState = {
  selectedQualities: { ground: 7, aircraft: 0 },
};

interface Props {
  military: Record<MilitaryKind, ProfileMilitaryUnit>;
  hasWarStash: boolean;
  resultBoxes: ResultBox[];
}

/** The inputs, and the results rendered into the boxes next to the ranks. */
export const InfluenceCalculator: React.FC<Props> = ({
  military,
  hasWarStash: initialHasWarStash,
  resultBoxes,
}) => {
  const [stored, setStored] = useLocalStorage<StoredState>(
    "influenceCalculator",
    initialStoredState,
  );
  const [hits, setHits] = useState("1");
  const [isNaturalEnemy, setIsNaturalEnemy] = useState(false);
  const [hasWarStash, setHasWarStash] = useState(initialHasWarStash);
  const [booster, setBooster] = useState("0%");
  const [legend, setLegend] = useState(
    () => `${getLegendBonusPercent(military.ground.rankNumber)}%`,
  );

  const eDay = getEDay();
  const arePricesFresh = isPriceCacheFresh(stored.prices, eDay);
  useEffect(() => {
    if (arePricesFresh) {
      return;
    }
    let isCancelled = false;
    MarketPicture.sendRequest(PRICES_COUNTRY_ID)
      .then((response) => {
        if (!isCancelled) {
          setStored((current) => ({
            ...current,
            prices: buildPriceCache(response, eDay),
          }));
        }
      })
      .catch((e) => error("Failed to load the influence calculator prices", e));
    return () => {
      isCancelled = true;
    };
  }, [arePricesFresh, eDay, setStored]);

  const inputs: CalculatorInputs = {
    hits: parseInputNumber(hits),
    isNaturalEnemy,
    hasWarStash,
    boosterPercent: parseInputNumber(booster),
    legendPercent: parseInputNumber(legend),
  };

  const selectQuality = (kind: MilitaryKind, quality: number) =>
    setStored((current) => ({
      ...current,
      selectedQualities: { ...current.selectedQualities, [kind]: quality },
    }));

  return (
    <>
      <div className={styles.Inputs}>
        <label>
          Hits
          <input
            type="text"
            className={styles.NumberInput}
            value={hits}
            onChange={(event) => setHits(event.target.value)}
          />
        </label>
        <label>
          Natural Enemy
          <input
            type="checkbox"
            className={styles.Checkbox}
            checked={isNaturalEnemy}
            onChange={(event) => setIsNaturalEnemy(event.target.checked)}
          />
        </label>
        <label title="+10% rank points">
          War Stash
          <input
            type="checkbox"
            className={styles.Checkbox}
            checked={hasWarStash}
            onChange={(event) => setHasWarStash(event.target.checked)}
          />
        </label>
        <label>
          Damage Booster
          <input
            type="text"
            className={styles.NumberInput}
            value={booster}
            onChange={(event) => setBooster(event.target.value)}
          />
        </label>
        <label>
          Legend Bonus
          <input
            type="text"
            className={styles.NumberInput}
            value={legend}
            onChange={(event) => setLegend(event.target.value)}
          />
        </label>
      </div>
      {resultBoxes.map(({ kind, container }) =>
        createPortal(
          <Results
            kind={kind}
            unit={military[kind]}
            quality={stored.selectedQualities[kind]}
            onQualityChange={(quality) => selectQuality(kind, quality)}
            inputs={inputs}
            prices={stored.prices}
          />,
          container,
          kind,
        ),
      )}
    </>
  );
};

const Results: React.FC<{
  kind: MilitaryKind;
  unit: ProfileMilitaryUnit;
  quality: number;
  onQualityChange: (quality: number) => void;
  inputs: CalculatorInputs;
  prices: PriceCache | undefined;
}> = ({ kind, unit, quality, onQualityChange, inputs, prices }) => {
  const weaponPrices =
    kind === "ground" ? prices?.weapons : prices?.aircraftWeapons;
  const results = calculateInfluenceResults(kind, unit, quality, inputs, {
    weaponPrice: weaponPrices?.[quality],
    foodPricePerEnergy: prices?.cheapestFoodPerEnergy,
  });

  return (
    <>
      <select
        className={styles.QualitySelect}
        value={quality}
        onChange={(event) => onQualityChange(Number(event.target.value))}
      >
        {getSelectableQualities(weaponPrices).map((selectable) => (
          <option key={selectable} value={selectable}>
            Q{selectable}
          </option>
        ))}
      </select>
      <span className={styles.Label}>Influence</span>
      <span className={styles.Value}>
        {formatCompact(results.influence, 1)}
      </span>
      <span className={styles.Label}>Hits to next rank</span>
      <span className={styles.Value}>
        {Number.isFinite(results.hitsToNextRank)
          ? formatCompact(results.hitsToNextRank, 1)
          : "∞"}
      </span>
      <span className={styles.Label}>Cost cc/M</span>
      <span className={styles.Value} title="Includes food">
        {results.costPerMillion === undefined
          ? "-"
          : formatCompact(results.costPerMillion, 2)}
      </span>
    </>
  );
};
