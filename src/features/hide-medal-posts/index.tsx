import { createFeature } from "../../utils/feature";
import { isSettingEnabled } from "../../settings/stuff-settings";
import { isOnHomepage, isTopWindow } from "../../utils/erep-global-info";
import { onXhrLoad } from "../../utils/xhr";
import { waitForElement } from "../../utils/dom";
import { OlderPostsLoader } from "./older-posts-loader";
import "./StaticStyles.scss";

const POST_SELECTOR = ".postContainer";

export const HideMedalPostsFeature = createFeature({
  id: "hide_medal_posts",
  name: "Hide Medal Posts",
  description:
    "Hides the automatic posts (medals, level ups) in the feed and loads older posts when too few are left.",
  canExecute: () => isOnHomepage() && isTopWindow(),
  isSettingEnabled: () => isSettingEnabled("hideMedals"),
  execute: ({ signal, onCleanup }) => {
    document.body.classList.add("su-hide-medal-posts");
    onCleanup(() => document.body.classList.remove("su-hide-medal-posts"));

    const loader = new OlderPostsLoader();
    const loadOlderPostsIfNeeded = () => {
      const button = document.querySelector<HTMLElement>(".previousposts");
      if (!button) {
        return;
      }
      const posts = {
        all: document.querySelectorAll(POST_SELECTOR).length,
        visible: document.querySelectorAll(`${POST_SELECTOR}:not(.autoPost)`)
          .length,
      };
      if (loader.shouldLoad(posts)) {
        button.click();
      }
    };

    onXhrLoad("wall-post/retrieve", loadOlderPostsIfNeeded, { signal });
    // The first posts come with the page
    waitForElement(POST_SELECTOR, 10_000).then(
      () => {
        if (!signal.aborted) {
          loadOlderPostsIfNeeded();
        }
      },
      () => {},
    );
  },
});
