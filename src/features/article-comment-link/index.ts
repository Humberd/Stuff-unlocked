import { createFeature } from "../../utils/feature";
import { onXhrLoad } from "../../utils/xhr";
import { getCommentJumpStep } from "./comment-jump";

/** The page may still move as images load, so it scrolls again after it. */
const SECOND_SCROLL_DELAY_MS = 500;

export const ArticleCommentLinkFeature = createFeature({
  id: "article_comment_link",
  name: "Article Comment Link",
  description:
    "Loads the comments of an article until the linked one shows up, and scrolls to it.",
  canExecute: (url) =>
    url.pathname.includes("/article/") && url.hash.includes("comment"),
  execute: ({ signal, onCleanup }) => {
    const commentId = decodeURIComponent(window.location.hash.slice(1));
    let loadMoreClicks = 0;
    let isDone = false;

    function showComment(canLoadMore: boolean) {
      if (isDone) {
        return;
      }
      const step = getCommentJumpStep(document, commentId, loadMoreClicks);
      if (step.type === "scroll") {
        isDone = true;
        step.comment.scrollIntoView();
        const timeoutId = window.setTimeout(
          () => step.comment.scrollIntoView(),
          SECOND_SCROLL_DELAY_MS,
        );
        onCleanup(() => window.clearTimeout(timeoutId));
      } else if (step.type === "loadMore" && canLoadMore) {
        loadMoreClicks++;
        step.buttons.forEach((button) => button.click());
      }
    }

    onXhrLoad("articleComments", () => showComment(true), { signal });
    // The comments may have loaded already
    showComment(false);
  },
});
