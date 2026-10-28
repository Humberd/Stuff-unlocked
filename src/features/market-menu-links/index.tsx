import { createFeature } from "../../utils/feature";
import { getCitizen, isTopWindow } from "../../utils/erep-global-info";
import { isSettingEnabled } from "../../settings/stuff-settings";
import { marketCountryId } from "./market-links";
import {
  MarketMenuLinks,
  marketMenuLinksMountOptions,
} from "./components/MarketMenuLinks";

export const MarketMenuLinksFeature = createFeature({
  id: "market_menu_links",
  name: "Market Menu Links",
  description:
    "Adds product icons to the menu that link to every quality of the product on the marketplace.",
  canExecute: () => isTopWindow(),
  isSettingEnabled: () => isSettingEnabled("marketLinks"),
  execute: ({ mount }) => {
    const menu = document.querySelector("#newMenu");
    const citizen = getCitizen();
    if (!menu || !citizen) {
      return;
    }

    mount(
      <MarketMenuLinks
        culture={erepublik.settings.culture}
        countryId={marketCountryId(citizen)}
      />,
      menu,
      marketMenuLinksMountOptions,
    );
  },
});
