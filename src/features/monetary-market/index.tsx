import { createFeature, type FeatureContext } from "../../utils/feature";
import { isSettingEnabled } from "../../settings/stuff-settings";
import { onXhrLoad } from "../../utils/xhr";
import { getCitizen } from "../../utils/erep-global-info";
import {
  ErepublikToolsLink,
  erepublikToolsLinkMountOptions,
} from "../improved-marketplace/components/ErepublikToolsLink";
import { getMaxGoldAmount } from "./gold-amount";
import "./StaticStyles.scss";

const AUTOFILL_CLASS = "su-monetary-market-autofill";

export const MonetaryMarketFeature = createFeature({
  id: "monetary_market",
  name: "Monetary Market",
  description:
    "Adds an eRepublik.tools link and fills in the most gold the citizen can buy.",
  canExecute: (url) => url.pathname.includes("/economy/exchange-market"),
  execute: (context) => {
    document.querySelectorAll(".e_cash h1").forEach((title) => {
      context.mount(
        <ErepublikToolsLink path="monetary-market/gold/statistics" />,
        title,
        erepublikToolsLinkMountOptions("narrow"),
      );
    });

    if (isSettingEnabled("autofillGold")) {
      autofillGold(context);
    }
  },
});

function autofillGold({ signal, onCleanup }: FeatureContext) {
  document.body.classList.add(AUTOFILL_CLASS);
  onCleanup(() => document.body.classList.remove(AUTOFILL_CLASS));

  onXhrLoad("exchange/retrieve", fillGoldAmounts, { signal });
  fillGoldAmounts();
}

function fillGoldAmounts() {
  const { currencyAmount } = getCitizen();
  document
    .querySelectorAll<HTMLButtonElement>("button[data-currency=GOLD]")
    .forEach((button) => {
      const input = button.previousElementSibling?.previousElementSibling;
      const offerMaximum = Number(button.dataset.max);
      const pricePerGold = Number(button.dataset.price);
      if (
        !(input instanceof HTMLInputElement) ||
        Number.isNaN(offerMaximum) ||
        !(pricePerGold > 0)
      ) {
        return;
      }
      input.value = String(
        getMaxGoldAmount(offerMaximum, pricePerGold, currencyAmount),
      );
      input.dispatchEvent(new Event("input"));
    });
}
