import { createFeature } from "../../utils/feature";
import "./StaticStyles.scss";

export const FeedCommentsScrollFeature = createFeature({
  id: "feed_comments_scroll",
  name: "Feed Comments Scroll",
  description: "Limits the height of feed comments and makes them scrollable.",
  canExecute: () => true,
  execute: ({ onCleanup }) => {
    document.body.classList.add("su-feed-comments-scroll");
    onCleanup(() => document.body.classList.remove("su-feed-comments-scroll"));
  },
});
