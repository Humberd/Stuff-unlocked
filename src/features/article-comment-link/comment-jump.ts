/** Stops loading more comments after this many pages without the comment. */
export const MAX_LOAD_MORE_CLICKS = 30;

export type CommentJumpStep =
  | { type: "scroll"; comment: HTMLElement }
  | { type: "loadMore"; buttons: HTMLElement[] }
  | { type: "stop" };

/** What to do to show the linked comment once some comments loaded. */
export function getCommentJumpStep(
  doc: Document,
  commentId: string,
  loadMoreClicks: number,
): CommentJumpStep {
  const comment = commentId ? doc.getElementById(commentId) : null;
  if (comment) {
    return { type: "scroll", comment };
  }
  const buttons = [...doc.querySelectorAll<HTMLElement>(".load-more-comments")];
  if (buttons.length === 0 || loadMoreClicks >= MAX_LOAD_MORE_CLICKS) {
    return { type: "stop" };
  }
  return { type: "loadMore", buttons };
}
