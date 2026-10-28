import { createFeature } from "../../utils/feature";
import { isTopWindow } from "../../utils/erep-global-info";
import { isSettingEnabled } from "../../settings/stuff-settings";
import { onXhrLoad } from "../../utils/xhr";
import { decodeWarnUrl, LINK_ADDING_REQUEST_PATTERN } from "./warn-url";

/** Messages are rendered a while after their request finished. */
const MESSAGES_RENDER_DELAY_MS = 300;

export const ExternalLinksFeature = createFeature({
  id: "external_links",
  name: "External Links",
  description:
    "Makes links to other sites open directly instead of through the game's warning page.",
  canExecute: () => isTopWindow(),
  isSettingEnabled: () => isSettingEnabled("externalLinks"),
  execute: ({ signal, onCleanup }) => {
    rewriteWarnLinks();

    const timeoutIds = new Set<number>();
    onXhrLoad(
      LINK_ADDING_REQUEST_PATTERN,
      (_response, url) => {
        rewriteWarnLinks();
        if (url.includes("main/messages")) {
          const timeoutId = window.setTimeout(() => {
            timeoutIds.delete(timeoutId);
            rewriteWarnLinks();
          }, MESSAGES_RENDER_DELAY_MS);
          timeoutIds.add(timeoutId);
        }
      },
      { signal },
    );
    onCleanup(() => timeoutIds.forEach((id) => window.clearTimeout(id)));
  },
});

function rewriteWarnLinks() {
  document
    .querySelectorAll<HTMLAnchorElement>('a[href*="/main/warn/"]')
    .forEach((link) => {
      const target = decodeWarnUrl(link.href);
      if (target) {
        link.href = target;
      }
    });
}
