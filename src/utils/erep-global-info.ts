declare const erepublik: any;
declare const SERVER_DATA: any;
declare const Environment: any;
declare const GM_info: any;

export function getCitizenshipCurrencyName(): string {
  return erepublik.citizen.citizenshipCurrencyName;
}

export function getCurrentRegionId(): string {
  return String(erepublik.citizen.residence.regionId);
}

export function getAuthToken() {
  return erepublik.settings.pomelo.authToken;
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
  return GM_info.script.version
}