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
