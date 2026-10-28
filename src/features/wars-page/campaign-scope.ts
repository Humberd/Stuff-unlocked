import type { Battle } from "../../requests/campaigns-json-list-request";

export const CAMPAIGNS_LIST_SELECTOR = "#ListCampaignsController";

export function isOnWarsPage(url: Location): boolean {
  return url.href.includes("military/campaigns");
}

/** The battle of a `.war_card` or of an element inside one. */
export function getCampaign(element: Element): Battle | undefined {
  return scopeOf<{ campaign: Battle }>(element)?.campaign;
}

/** Server time of the battle list, in seconds. */
export function getCampaignsRequestTime(): number | undefined {
  return scopeOf<{ campaigns: { requestTime?: number } }>(
    CAMPAIGNS_LIST_SELECTOR,
  )?.campaigns?.requestTime;
}

function scopeOf<T>(element: Element | string): Partial<T> | undefined {
  return angular.element(element).scope() as unknown as Partial<T> | undefined;
}
