/** Fewer posts than this, medal posts aside, look like an empty feed. */
export const MIN_VISIBLE_POSTS = 5;
/** A safety net, so that a feed of medal posts can't keep us loading forever. */
export const MAX_LOADS = 10;

export interface FeedPosts {
  all: number;
  /** All the posts but medal ones. */
  visible: number;
}

/**
 * Decides when to load older posts, so that enough posts stay visible with
 * the medal posts hidden. Stops for good once loading brought no new posts,
 * i.e. at the end of the feed.
 */
export class OlderPostsLoader {
  private loads = 0;
  private postsBeforeLastLoad: number | undefined;
  private isFinished = false;

  /** Records a load when it returns true. */
  shouldLoad(posts: FeedPosts): boolean {
    if (
      this.postsBeforeLastLoad !== undefined &&
      posts.all <= this.postsBeforeLastLoad
    ) {
      this.isFinished = true;
    }
    if (
      this.isFinished ||
      this.loads >= MAX_LOADS ||
      posts.visible >= MIN_VISIBLE_POSTS
    ) {
      return false;
    }
    this.loads++;
    this.postsBeforeLastLoad = posts.all;
    return true;
  }
}
