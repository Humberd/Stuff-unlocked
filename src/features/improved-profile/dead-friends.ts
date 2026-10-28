import { ExternalProperty } from "../../hooks/external-property";
import { error, toError } from "../../utils/utils";

const FRIENDS_PER_PAGE = 20;

/** The first number of a text like "Friends (1,234)", 0 without one. */
export function parseFriendsCount(text: string): number {
  const count = /\d[\d,]*/.exec(text)?.[0];
  return count ? Number(count.replace(/,/g, "")) : 0;
}

/** Lowers the first number of a text like "Friends (1,234)" by one. */
export function decrementFriendsCount(text: string): string {
  return text.replace(/\d[\d,]*/, (count) =>
    String(Math.max(0, Number(count.replace(/,/g, "")) - 1)),
  );
}

/** Pages of the friends list, at least one. */
export function countFriendsPages(friendsCount: number): number {
  return Math.max(1, Math.ceil(friendsCount / FRIENDS_PER_PAGE));
}

/** Ids of the dead friends in a page of the friends list, from elements like `<li class="dead" id="friend_123">`. */
export function parseDeadFriendIds(html: string): string[] {
  const page = new DOMParser().parseFromString(html, "text/html");
  return [...page.querySelectorAll(".dead")]
    .map((element) => element.id.split("_")[1])
    .filter((id): id is string => Boolean(id));
}

export type DeadFriendsRemoverState =
  | { status: "idle" }
  | { status: "scanning"; percent: number }
  | { status: "confirming"; friendIds: string[] }
  | { status: "removing"; left: number }
  | { status: "done"; removed: number }
  | { status: "failed"; message: string };

export interface DeadFriendsRemoverDeps {
  /** HTML of a page of the player's friends list, counted from 1. */
  fetchFriendsPage: (page: number) => Promise<string>;
  countFriendsPages: () => number;
  removeFriend: (friendId: string) => Promise<void>;
  onFriendRemoved: () => void;
}

/**
 * Finds the dead friends of the player and, once confirmed, removes them
 * one by one.
 */
export class DeadFriendsRemover {
  readonly state = new ExternalProperty<DeadFriendsRemoverState>({
    status: "idle",
  });

  private readonly deps: DeadFriendsRemoverDeps;

  constructor(deps: DeadFriendsRemoverDeps) {
    this.deps = deps;
  }

  get isBusy(): boolean {
    const { status } = this.state.get();
    return status === "scanning" || status === "removing";
  }

  /** Never rejects, errors end in the `failed` state. */
  async scan(): Promise<void> {
    if (this.isBusy) {
      return;
    }
    this.state.update({ status: "scanning", percent: 0 });
    try {
      const pagesCount = this.deps.countFriendsPages();
      const friendIds = new Set<string>();
      for (let page = 1; page <= pagesCount; page++) {
        const html = await this.deps.fetchFriendsPage(page);
        parseDeadFriendIds(html).forEach((id) => friendIds.add(id));
        this.state.update({
          status: "scanning",
          percent: (page / pagesCount) * 100,
        });
      }
      this.state.update(
        friendIds.size > 0
          ? { status: "confirming", friendIds: [...friendIds] }
          : { status: "done", removed: 0 },
      );
    } catch (e) {
      this.fail("Failed to find the dead friends", e);
    }
  }

  /** Removes the friends found by {@link scan}. Never rejects. */
  async removeAll(): Promise<void> {
    const state = this.state.get();
    if (state.status !== "confirming") {
      return;
    }
    const friendIds = [...state.friendIds];
    let removed = 0;
    try {
      for (const friendId of friendIds) {
        this.state.update({
          status: "removing",
          left: friendIds.length - removed,
        });
        await this.deps.removeFriend(friendId);
        removed++;
        this.deps.onFriendRemoved();
      }
      this.state.update({ status: "done", removed });
    } catch (e) {
      this.fail("Failed to remove the dead friends", e);
    }
  }

  private fail(message: string, e: unknown) {
    error(message, e);
    this.state.update({ status: "failed", message: toError(e).message });
  }
}
