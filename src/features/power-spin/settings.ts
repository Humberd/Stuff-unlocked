export interface PowerSpinSettings {
  maxMoneyPerSpin: string;
  stopAtGoldJackpot: boolean;
  spinAnimationSeconds: string;
}

/** Where the settings were kept before Power Spin moved to React. */
const LEGACY_STORAGE_KEYS = {
  MAX_MONEY: "as-max-money-per-spin",
  STOP_AT_GOLD_JACKPOT: "as-stop-at-gold",
  SPIN_ANIMATION_IN_SECONDS: "as-spin-animation-in-seconds",
};

/** Default settings, carrying over whatever was saved under the legacy keys. */
export function readLegacySettings(): PowerSpinSettings {
  return {
    maxMoneyPerSpin: localStorage.getItem(LEGACY_STORAGE_KEYS.MAX_MONEY) ?? "",
    stopAtGoldJackpot:
      localStorage.getItem(LEGACY_STORAGE_KEYS.STOP_AT_GOLD_JACKPOT) !==
      "false",
    spinAnimationSeconds:
      localStorage.getItem(LEGACY_STORAGE_KEYS.SPIN_ANIMATION_IN_SECONDS) ||
      "1",
  };
}

export function removeLegacySettings() {
  Object.values(LEGACY_STORAGE_KEYS).forEach((key) =>
    localStorage.removeItem(key),
  );
}
