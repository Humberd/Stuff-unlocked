import { createFeature } from "../../utils/feature";
import { isTopWindow } from "../../utils/erep-global-info";
import {
  electionsUrl,
  electionTypeForDay,
  parseDayOfMonth,
} from "./election-type";

export const ElectionsLinkFeature = createFeature({
  id: "elections_link",
  name: "Elections Link",
  description:
    "Points the elections link of the menu at the current elections.",
  canExecute: () => isTopWindow(),
  execute: ({ onCleanup }) => {
    const link = document.querySelector<HTMLAnchorElement>(
      '#menu5 li a[href*="elections"]',
    );
    const dateText = document.querySelector(".date")?.textContent;
    const day = dateText ? parseDayOfMonth(dateText) : undefined;
    if (!link || day === undefined) {
      return;
    }

    const originalHref = link.getAttribute("href");
    link.href = electionsUrl(
      erepublik.settings.culture,
      electionTypeForDay(day),
    );
    if (originalHref !== null) {
      onCleanup(() => link.setAttribute("href", originalHref));
    }
  },
});
