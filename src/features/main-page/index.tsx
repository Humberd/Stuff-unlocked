import {
  createFeature,
  type FeatureContext,
  runIndependently,
} from "../../utils/feature";
import { isOnHomepage } from "../../utils/erep-global-info";
import { StorageInfo } from "./components/StorageInfo";
import * as InventoryHtml from "../../requests/inventory-html-request";
import * as VipShopHtml from "../../requests/vip-shop-html-request";
import { VipStatus } from "./components/VipStatus";
import { ensure } from "../../utils/utils";
import {
  WeeklyChallengeCalculatorButton,
  weeklyChallengeCalculatorButtonMountOptions,
} from "./components/WeeklyChallengeCalculatorButton";
import { retryNullish } from "../../utils/time";

export const MainPageFeature = createFeature({
  id: "main_page",
  name: "Main Page",
  canExecute: () => isOnHomepage(),
  execute: (context) =>
    runIndependently([
      () => weeklyChallengeCalculator(context),
      () => sidebarInfo(context),
    ]),
});

async function weeklyChallengeCalculator({ mount }: FeatureContext) {
  await retryNullish(
    () => document.querySelector("#weeklyChallenge"),
    "Can't find weekly challenge section",
    40,
    50,
  );

  mount(
    <WeeklyChallengeCalculatorButton />,
    document.querySelector("#weeklyChallenge > .weekly_challenge_title"),
    weeklyChallengeCalculatorButtonMountOptions,
  );
}

/**
 * Both widgets load in parallel, so their slots are inserted up front
 * to keep the order fixed no matter which request finishes first.
 */
async function sidebarInfo({ mount }: FeatureContext) {
  const anchor = ensure(
    document.querySelector(".sidebar .currency_amount"),
    "Can't find the sidebar currency amount",
  );
  const storageInfo = mount(null, anchor);
  const vipStatus = mount(null, storageInfo.container);

  await runIndependently([
    async () =>
      storageInfo.render(<StorageInfo {...await loadStorageInfo()} />),
    async () => vipStatus.render(<VipStatus {...await loadVipStatus()} />),
  ]);
}

async function loadVipStatus() {
  const html = await VipShopHtml.sendRequest();
  const doc = new DOMParser().parseFromString(html, "text/html");
  const readNumber = (selector: string) =>
    Number(
      ensure(doc.querySelector(selector), `Can't find ${selector}`)
        .textContent.trim()
        .replace(",", ""),
    );

  return {
    level: readNumber("#vip_level"),
    currentPoints: readNumber("#vip_points"),
    totalPoints: readNumber("#next_threshold"),
    isClaimed:
      doc.querySelector("#claimDailyVIPPoints[style='display:none']") !== null,
  };
}

async function loadStorageInfo() {
  const html = await InventoryHtml.sendRequest();
  const doc = new DOMParser().parseFromString(html, "text/html");
  const selector = ".used_storage_wrapper .used_storage";
  const usedStorage = ensure(
    doc.querySelector(selector),
    `Can't find ${selector}`,
  );
  const rawValues = ensure(
    usedStorage.getAttribute("title"),
    `${selector} has no title attribute`,
  );

  const { current, total } = parseValues(rawValues);
  return { current, total, free: total - current };
}

/**
 * Converts a string like "1,234 / 5,678" to an object with current and total properties
 */
export function parseValues(input: string) {
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
