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
    async () => {
      const { current, total } = InventoryHtml.parseUsedStorage(
        await InventoryHtml.sendRequest(),
      );
      storageInfo.render(
        <StorageInfo current={current} total={total} free={total - current} />,
      );
    },
    async () => {
      const status = VipShopHtml.parseVipStatus(
        await VipShopHtml.sendRequest(),
      );
      vipStatus.render(<VipStatus {...status} />);
    },
  ]);
}
