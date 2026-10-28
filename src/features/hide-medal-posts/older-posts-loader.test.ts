import { describe, expect, it } from "vitest";
import { MAX_LOADS, OlderPostsLoader } from "./older-posts-loader";

describe("OlderPostsLoader", () => {
  it("doesn't load when enough posts are visible", () => {
    expect(new OlderPostsLoader().shouldLoad({ all: 20, visible: 5 })).toBe(
      false,
    );
  });

  it("loads while too few posts are visible and loading brings new ones", () => {
    const loader = new OlderPostsLoader();
    expect(loader.shouldLoad({ all: 10, visible: 1 })).toBe(true);
    expect(loader.shouldLoad({ all: 20, visible: 2 })).toBe(true);
    expect(loader.shouldLoad({ all: 30, visible: 6 })).toBe(false);
  });

  it("stops for good once loading brought no new posts", () => {
    const loader = new OlderPostsLoader();
    expect(loader.shouldLoad({ all: 10, visible: 1 })).toBe(true);
    expect(loader.shouldLoad({ all: 10, visible: 1 })).toBe(false);
    expect(loader.shouldLoad({ all: 20, visible: 1 })).toBe(false);
  });

  it(`stops after ${MAX_LOADS} loads`, () => {
    const loader = new OlderPostsLoader();
    for (let i = 1; i <= MAX_LOADS; i++) {
      expect(loader.shouldLoad({ all: i * 10, visible: 0 })).toBe(true);
    }
    expect(loader.shouldLoad({ all: 1000, visible: 0 })).toBe(false);
  });
});
