/**
 * Globals defined by eRepublik's own scripts.
 * Only the fields this script uses are typed.
 */

declare const erepublik: {
  citizen: {
    citizenId: number;
    name: string;
    citizenshipCurrencyName: string;
    /** Citizenship country id. */
    country: number;
    /** Country and region the citizen is in right now. */
    countryLocationId: number;
    regionLocationId: number;
    residence: {
      /** 1 when the citizen has a residence. */
      hasResidence: number;
      regionId: number;
      countryId: number;
      cityId: number;
    };
    division: number;
    userLevel: number;
    currentExperiencePoints: number;
    /** Currency code of the country the citizen is in, e.g. "PLN". */
    currency: string;
    currencyAmount: number;
    gold: number;
    canSwitchDivisions: boolean;
    /** Energy when the page loaded. */
    energy: number;
    energyPoolLimit: number;
    energyToRecover: number;
    recoverableEnergy: number;
  };
  settings: {
    cookielessHost: string;
    /** Language of the site, e.g. "en". */
    culture: string;
    /** Day of the game. */
    eDay: number;
    isOnHomepage: boolean;
  };
  info: {
    countries: Record<
      string,
      { id: string; name: string; permalink: string; isDictatorship: boolean }
    >;
  };
  /** Only present on pages with the Power Spin button. */
  wheel_of_fortune: WheelOfFortune;
};

interface WheelOfFortune {
  showMultiPrize(...args: unknown[]): void;
  multispin: (
    this: WheelOfFortune,
    numPrizes: number,
    always3: boolean,
    response: WheelOfFortuneSpinResponse,
    multiSpin: boolean,
  ) => void;
}

interface WheelOfFortuneSpinResponse {
  /** Cost of the next spin, after the spins in this response were paid for. */
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
    to: (
      this: unknown,
      target: unknown,
      duration: number,
      vars: { ease?: unknown },
    ) => unknown;
  };
};
declare const Expo: { easeOut: unknown };

/** Page data. The battlefield fields are only present on a battlefield. */
declare const SERVER_DATA: {
  csrfToken: string;
  isLoggedIn?: boolean;
  /** Set while the game asks the player to prove they are not a bot. */
  sessionValidation?: unknown;
  webDeployEnabled?: boolean;
  battleId?: number;
  battleZoneId?: number;
  zoneId?: number;
  leftBattleId?: number;
  rightBattleId?: number;
  realInvaderId?: number;
  isResistance?: boolean;
  isCivilWar?: boolean;
  spectatorOnly?: boolean;
  onAirforceBattlefield?: boolean;
  canSwitchDivisions?: boolean;
  deployment?: unknown;
  points?: { attacker: number; defender: number };
};

declare const Environment: { isOnHomepage: boolean };

declare const angular: {
  element(element: Element | string | null): {
    scope(): AngularScope | undefined;
    injector(): { get(name: string): unknown } | undefined;
  };
};

interface AngularScope {
  $apply(callback: () => void): void;
}

/** Turns the travel map's mouse handling off and on. */
declare function disableMap(): void;
declare function enableMap(): void;
