import { beforeEach, describe, expect, it } from "vitest";
import { getCommentJumpStep, MAX_LOAD_MORE_CLICKS } from "./comment-jump";

describe("getCommentJumpStep", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("scrolls to the comment once it is loaded", () => {
    document.body.innerHTML =
      '<div id="comment5">Hi</div><a class="load-more-comments"></a>';

    expect(getCommentJumpStep(document, "comment5", 0)).toEqual({
      type: "scroll",
      comment: document.getElementById("comment5"),
    });
  });

  it("loads more comments until the comment shows up", () => {
    document.body.innerHTML = '<a class="load-more-comments"></a>';

    const step = getCommentJumpStep(document, "comment5", 3);

    expect(step.type).toBe("loadMore");
  });

  it("stops without more comments or after too many pages", () => {
    expect(getCommentJumpStep(document, "comment5", 0).type).toBe("stop");

    document.body.innerHTML = '<a class="load-more-comments"></a>';
    expect(
      getCommentJumpStep(document, "comment5", MAX_LOAD_MORE_CLICKS).type,
    ).toBe("stop");
  });
});
