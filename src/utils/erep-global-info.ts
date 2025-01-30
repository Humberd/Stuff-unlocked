declare const erepublik: any;
declare const SERVER_DATA: any;
declare const Environment: any;

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