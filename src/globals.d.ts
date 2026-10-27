/**
 * Globals defined by eRepublik's own scripts.
 * Only the fields this script uses are typed.
 */

declare const erepublik: {
  citizen: {
    citizenId: number;
    citizenshipCurrencyName: string;
    residence: { regionId: number };
  };
  settings: { cookielessHost: string };
  /** Only present on pages with the Power Spin button. */
  wheel_of_fortune: WheelOfFortune;
};

interface WheelOfFortune {
  showMultiPrize(...args: unknown[]): void;
  multispin(
    numPrizes: number,
    always3: boolean,
    response: WheelOfFortuneSpinResponse,
    multiSpin: boolean,
  ): void;
}

interface WheelOfFortuneSpinResponse {
  /** Cost of the first prize in this response. */
  cost: number;
  /** Number of jackpot symbols collected so far, 3 means the gold jackpot. */
  jackpot: number;
  prizes: { index: number }[];
}

interface WheelOfFortuneBuildData {
  /** Cost of the next spin. */
  cost: number;
  prizes: { prizes: Record<number, { tooltip: string; icon: string }> };
}

interface Window {
  global_wof_build_data: WheelOfFortuneBuildData;
}

/** GSAP 1.x, used by the Power Spin animation. */
declare const TimelineMax: {
  prototype: {
    to(target: unknown, duration: number, vars: { ease?: unknown }): unknown;
  };
};
declare const Expo: { easeOut: unknown };

declare const SERVER_DATA: { csrfToken: string };

declare const Environment: { isOnHomepage: boolean };

declare const angular: {
  element(element: Element | null): {
    scope(): AngularScope | undefined;
  };
};

interface AngularScope {
  $apply(callback: () => void): void;
}

/** Turns the travel map's mouse handling off and on. */
declare function disableMap(): void;
declare function enableMap(): void;
