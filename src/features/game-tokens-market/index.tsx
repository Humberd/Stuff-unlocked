import { createFeature } from "../../utils/feature";
import { isSettingEnabled } from "../../settings/stuff-settings";
import { onXhrLoad } from "../../utils/xhr";
import {
  ErepublikToolsLink,
  erepublikToolsLinkMountOptions,
} from "../improved-marketplace/components/ErepublikToolsLink";

export const GameTokensMarketFeature = createFeature({
  id: "game_tokens_market",
  name: "Game Tokens Market",
  description:
    "Adds an eRepublik.tools link and fills in the max quantity of the offers.",
  canExecute: (url) => url.pathname.includes("tokens-market"),
  execute: ({ mount, signal }) => {
    document.querySelectorAll("#marketplace h1").forEach((title) => {
      mount(
        <ErepublikToolsLink path="game-token/statistics/price" />,
        title,
        erepublikToolsLinkMountOptions("narrow"),
      );
    });

    if (isSettingEnabled("autofillMarket")) {
      onXhrLoad(
        "economy/gameTokensMarketAjax",
        () => {
          // Only sets the quantity inputs to their maximum
          document
            .querySelectorAll<HTMLElement>(".quantity_button.maximum")
            .forEach((button) => button.click());
        },
        { signal },
      );
    }
  },
});
