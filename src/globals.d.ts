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
};

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
