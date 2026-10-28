export function getCitizenshipCurrencyName(): string {
  return erepublik.citizen.citizenshipCurrencyName;
}

export function getCurrentRegionId(): string {
  return String(erepublik.citizen.residence.regionId);
}

export function getCsrfToken() {
  return SERVER_DATA.csrfToken;
}

export function isOnHomepage(): boolean {
  return Environment.isOnHomepage;
}

export function getCitizenId(): number | undefined {
  return erepublik?.citizen?.citizenId;
}

export function getStuffVersion(): string {
  return __APP_VERSION__;
}

export function getCookielessHost(): string {
  return erepublik.settings.cookielessHost;
}

export function getCitizen() {
  return erepublik.citizen;
}

/** Name of a country by its id, e.g. "Poland". */
export function getCountryName(countryId: number | string): string | undefined {
  return erepublik.info.countries[String(countryId)]?.name;
}

/** Permalink of a country by its id, e.g. "Poland", as used in flag urls. */
export function getCountryPermalink(
  countryId: number | string,
): string | undefined {
  return erepublik.info.countries[String(countryId)]?.permalink;
}

export function getEDay(): number {
  return erepublik.settings.eDay;
}

export function isTopWindow(): boolean {
  return window.top === window.self;
}
