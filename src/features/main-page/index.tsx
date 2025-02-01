import { createFeature } from "../../utils/feature";
import { isOnHomepage } from "../../utils/erep-global-info";
import { renderElement, renderElementWithRoot } from "../../utils/render";
import { StorageInfo } from "./components/StorageInfo";
import { InventoryHtml } from "../../requests/inventory-html-request";
import { VipShopHtml } from "../../requests/vip-shop-html-request";
import { VipStatus } from "./components/VipStatus";
import { ensure } from "../../utils/utils";
import {
  createWeeklyChallengeCalculatorButtonRootElement,
  WeeklyChallengeCalculatorButton,
} from "./components/WeeklyChallengeCalculatorButton";
import { retryNullish } from "../../utils/time";

export const MainPageFeature = createFeature({
  id: "main_page",
  name: "Main Page",
  canExecute: (url) => isOnHomepage(),
  execute: async () => {
    await weeklyChallengeCalculator();
    await vipInfo();
    await storageInfo();
  },
});

async function weeklyChallengeCalculator() {
  retryNullish(
    () => document.querySelector("#weeklyChallenge"),
    "Can't find weekly challenge section",
    40,
    50,
  );

  renderElementWithRoot(
    <WeeklyChallengeCalculatorButton />,
    createWeeklyChallengeCalculatorButtonRootElement(),
  ).after(document.querySelector("#weeklyChallenge > .weekly_challenge_title"));
}

async function vipInfo() {
  const html = await VipShopHtml.sendRequest({});
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const vipLevel = Number(
    ensure(doc.querySelector("#vip_level"))
      .textContent?.trim()
      ?.replace(",", ""),
  );
  const vipPoints = Number(
    ensure(doc.querySelector("#vip_points"))
      .textContent?.trim()
      ?.replace(",", ""),
  );
  const nextVipPoints = Number(
    ensure(doc.querySelector("#next_threshold"))
      .textContent?.trim()
      ?.replace(",", ""),
  );
  const isClaimed = doc.querySelector("#vip_claimed.disabled") !== null;

  renderElement(
    <VipStatus
      level={vipLevel}
      currentPoints={vipPoints}
      totalPoints={nextVipPoints}
      isClaimed={isClaimed}
    />,
  ).after(document.querySelector(".sidebar .currency_amount"));
}

async function storageInfo() {
  const html = await InventoryHtml.sendRequest({});
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const selectors = ".used_storage_wrapper .used_storage";
  const currencyAmount = doc.querySelector(selectors);
  if (!currencyAmount) {
    console.error(`Element with selector '${selectors}' not found`);
    return;
  }
  const originalTitle = "title";
  const rawValues = currencyAmount.getAttribute(originalTitle);
  if (!rawValues) {
    console.error(
      `Element with selector '${selectors}' has no ${originalTitle} attribute`,
    );
    return;
  }

  const { current, total } = parseValues(rawValues);
  const free = total - current;

  renderElement(
    <StorageInfo current={current} total={total} free={free} />,
  ).after(document.querySelector(".sidebar .currency_amount"));
}

/**
 * Converts a string like "1,234 / 5,678" to an object with current and total properties
 */
function parseValues(input: string) {
  // Split the input by '/' and trim whitespace from each part
  const [currentStr, totalStr] = input.split("/").map((part) => part.trim());

  // Helper function to remove commas and convert to a number
  const toNumber = (str: string): number => {
    return Number(str.replace(/,/g, "")); // Remove commas and convert to number
  };

  return {
    current: toNumber(currentStr),
    total: toNumber(totalStr),
  };
}
