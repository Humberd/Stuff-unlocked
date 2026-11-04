import * as MyCompaniesHtml from "../../requests/my-companies-html-request";
import { getCitizen, isOnHomepage } from "../../utils/erep-global-info";
import { parseEnergy } from "../company-manager/manager-work";

const TEXT_SELECTORS = [
  "#side_bar_gold_account_value",
  "#side_bar_currency_account_value",
  "#currentEnergy",
];
const BAR_SELECTORS = [".currentEnergyBar", ".potentialEnergyBar"];

interface WeeklyChallengeScope {
  getData(): void;
}

/**
 * The game doesn't know what the routine did, so what it changed is
 * brought up to date from a fresh copy of a page.
 */
export async function refreshPage() {
  const fresh = new DOMParser().parseFromString(
    await MyCompaniesHtml.sendRequest(),
    "text/html",
  );

  for (const selector of TEXT_SELECTORS) {
    const element = document.querySelector(selector);
    const value = fresh.querySelector(selector)?.textContent;
    if (element && value) {
      element.textContent = value;
    }
  }
  for (const selector of BAR_SELECTORS) {
    const element = document.querySelector<HTMLElement>(selector);
    const width = fresh.querySelector<HTMLElement>(selector)?.style.width;
    if (element && width) {
      element.style.width = width;
    }
  }

  const energy = parseEnergy(
    fresh.querySelector("#currentEnergy")?.textContent,
  );
  if (energy !== undefined) {
    getCitizen().energy = energy;
  }

  if (isOnHomepage()) {
    (
      angular.element("#weeklyChallenge").scope() as unknown as
        | WeeklyChallengeScope
        | undefined
    )?.getData();
  }
}
