import { describe, expect, it, vi } from "vitest";
import {
  countFriendsPages,
  DeadFriendsRemover,
  type DeadFriendsRemoverDeps,
  type DeadFriendsRemoverState,
  decrementFriendsCount,
  parseDeadFriendIds,
  parseFriendsCount,
} from "./dead-friends";

vi.mock("../../utils/utils", async (importOriginal) => ({
  ...(await importOriginal()),
  error: vi.fn(),
}));

describe("parseFriendsCount / decrementFriendsCount", () => {
  it("reads and lowers the friends count", () => {
    expect(parseFriendsCount("Friends (1,234)")).toBe(1234);
    expect(parseFriendsCount("Friends")).toBe(0);
    expect(decrementFriendsCount("Friends (1,234)")).toBe("Friends (1233)");
    expect(decrementFriendsCount("Friends (0)")).toBe("Friends (0)");
  });
});

describe("countFriendsPages", () => {
  it("counts pages of 20 friends, at least one", () => {
    expect(countFriendsPages(0)).toBe(1);
    expect(countFriendsPages(20)).toBe(1);
    expect(countFriendsPages(21)).toBe(2);
  });
});

describe("parseDeadFriendIds", () => {
  it("collects the ids of the dead friends", () => {
    const html = `
      <ul>
        <li class="dead" id="friend_11"></li>
        <li id="friend_12"></li>
        <li class="dead" id="friend_13"></li>
        <li class="dead"></li>
      </ul>`;

    expect(parseDeadFriendIds(html)).toEqual(["11", "13"]);
  });
});

function createDeps(pages: string[][]) {
  return {
    fetchFriendsPage: vi.fn<DeadFriendsRemoverDeps["fetchFriendsPage"]>(
      (page) =>
        Promise.resolve(
          (pages[page - 1] ?? [])
            .map((id) => `<li class="dead" id="friend_${id}"></li>`)
            .join(""),
        ),
    ),
    countFriendsPages: () => pages.length,
    removeFriend: vi.fn<DeadFriendsRemoverDeps["removeFriend"]>(() =>
      Promise.resolve(),
    ),
    onFriendRemoved: vi.fn(),
  };
}

function recordStates(remover: DeadFriendsRemover) {
  const states: DeadFriendsRemoverState[] = [];
  remover.state.subscribe(() => states.push(remover.state.get()));
  return states;
}

describe("DeadFriendsRemover", () => {
  it("scans every page and waits for a confirmation", async () => {
    const deps = createDeps([
      ["1", "2"],
      ["2", "3"],
    ]);
    const remover = new DeadFriendsRemover(deps);
    const states = recordStates(remover);

    await remover.scan();

    expect(deps.fetchFriendsPage.mock.calls).toEqual([[1], [2]]);
    expect(states).toEqual([
      { status: "scanning", percent: 0 },
      { status: "scanning", percent: 50 },
      { status: "scanning", percent: 100 },
      { status: "confirming", friendIds: ["1", "2", "3"] },
    ]);
    expect(deps.removeFriend).not.toHaveBeenCalled();
  });

  it("removes the found friends once confirmed", async () => {
    const deps = createDeps([["1", "2"]]);
    const remover = new DeadFriendsRemover(deps);
    await remover.scan();

    await remover.removeAll();

    expect(deps.removeFriend.mock.calls).toEqual([["1"], ["2"]]);
    expect(deps.onFriendRemoved).toHaveBeenCalledTimes(2);
    expect(remover.state.get()).toEqual({ status: "done", removed: 2 });
  });

  it("removes nothing without a scan", async () => {
    const deps = createDeps([["1"]]);
    const remover = new DeadFriendsRemover(deps);

    await remover.removeAll();

    expect(deps.removeFriend).not.toHaveBeenCalled();
    expect(remover.state.get()).toEqual({ status: "idle" });
  });

  it("is done right away without dead friends", async () => {
    const remover = new DeadFriendsRemover(createDeps([[]]));

    await remover.scan();

    expect(remover.state.get()).toEqual({ status: "done", removed: 0 });
  });

  it("stops at the first failed removal", async () => {
    const deps = createDeps([["1", "2"]]);
    deps.removeFriend.mockRejectedValueOnce(new Error("Nope"));
    const remover = new DeadFriendsRemover(deps);
    await remover.scan();

    await remover.removeAll();

    expect(deps.removeFriend).toHaveBeenCalledTimes(1);
    expect(deps.onFriendRemoved).not.toHaveBeenCalled();
    expect(remover.state.get()).toEqual({ status: "failed", message: "Nope" });
  });

  it("fails when a page doesn't load", async () => {
    const deps = createDeps([["1"]]);
    deps.fetchFriendsPage.mockRejectedValueOnce(new Error("Offline"));
    const remover = new DeadFriendsRemover(deps);

    await remover.scan();

    expect(remover.state.get()).toEqual({
      status: "failed",
      message: "Offline",
    });
  });
});
