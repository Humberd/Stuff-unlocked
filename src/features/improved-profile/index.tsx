import {
  createFeature,
  type FeatureContext,
  runIndependently,
} from "../../utils/feature";
import "./StaticStyles.scss";
import { isSettingEnabled, readStuffData } from "../../settings/stuff-settings";
import { getCitizenId, getCsrfToken } from "../../utils/erep-global-info";
import * as FriendsList from "../../requests/citizen-friends-list-request";
import * as FriendRemove from "../../requests/citizen-friend-remove-request";
import {
  getFullSizeAvatarUrl,
  isProfilePage,
  isProfileSubpage,
  parseProfileCitizenId,
  sumAchievementCounters,
  toLegendRankName,
} from "./profile-page";
import { waitForProfileData } from "./profile-data";
import {
  countFriendsPages,
  DeadFriendsRemover,
  decrementFriendsCount,
  parseFriendsCount,
} from "./dead-friends";
import { RemoveDeadFriendsButton } from "./components/RemoveDeadFriendsButton";
import { ContributorBadge } from "./components/ContributorBadge";
import { AchievementsSummary } from "./components/AchievementsSummary";

export const ImprovedProfileFeature = createFeature({
  id: "improved_profile",
  name: "Improved Profile",
  description:
    "Links the full size avatar, counts the achievements, marks Stuff++ contributors and removes dead friends.",
  canExecute: (url) =>
    isProfilePage(url.pathname) || isProfileSubpage(url.pathname),
  isSettingEnabled: () => isSettingEnabled("improveProfile"),
  execute: async (context) => {
    const { pathname } = window.location;
    const profileId = parseProfileCitizenId(pathname);
    if (profileId === undefined) {
      return;
    }
    const isOwnProfile = profileId === getCitizenId();
    const canRemoveDeadFriends = isOwnProfile && isProfilePage(pathname);

    const bodyClasses = ["su-improved-profile"];
    if (canRemoveDeadFriends) {
      bodyClasses.push("su-improved-profile-own");
    }
    if (!isOwnProfile) {
      bodyClasses.push("su-improved-profile-other");
    }
    document.body.classList.add(...bodyClasses);
    context.onCleanup(() => document.body.classList.remove(...bodyClasses));

    await runIndependently([
      () => linkAvatarToFullSize(context),
      () => showContributorBadge(context, profileId),
      () =>
        canRemoveDeadFriends && addRemoveDeadFriendsButton(context, profileId),
      () => isProfilePage(pathname) && improveCareer(context, profileId),
    ]);
  },
});

function linkAvatarToFullSize({ onCleanup }: FeatureContext) {
  const avatar = document.querySelector(".citizen_avatar");
  if (!avatar || avatar.closest("a")) {
    return;
  }
  const url = getFullSizeAvatarUrl(avatar.getAttribute("style") ?? "");
  if (!url) {
    return;
  }

  const link = document.createElement("a");
  link.href = url;
  avatar.replaceWith(link);
  link.append(avatar);
  onCleanup(() => link.replaceWith(...link.childNodes));
}

function showContributorBadge({ mount }: FeatureContext, profileId: number) {
  if (!readStuffData().contributors?.includes(profileId)) {
    return;
  }
  const sidebar = document.querySelector(".citizen_sidebar");
  if (sidebar) {
    mount(<ContributorBadge />, sidebar, { position: "prepend" });
  }
}

function addRemoveDeadFriendsButton(
  { mount }: FeatureContext,
  citizenId: number,
) {
  const activity = document.querySelector(".citizen_activity");
  if (!activity) {
    return;
  }
  const friendsCount = document.querySelector(".friends_title a");

  const remover = new DeadFriendsRemover({
    fetchFriendsPage: async (page) =>
      (await FriendsList.sendRequest(citizenId, page)).content,
    countFriendsPages: () =>
      countFriendsPages(parseFriendsCount(friendsCount?.textContent ?? "")),
    removeFriend: (friendId) =>
      FriendRemove.sendRequest(friendId, getCsrfToken()),
    onFriendRemoved: () => {
      if (friendsCount?.textContent) {
        friendsCount.textContent = decrementFriendsCount(
          friendsCount.textContent,
        );
      }
    },
  });
  mount(<RemoveDeadFriendsButton remover={remover} />, activity, {
    position: "append",
  });
}

/** The achievements and ranks are rendered once the profile data has loaded. */
async function improveCareer(
  { mount, signal, onCleanup }: FeatureContext,
  profileId: number,
) {
  await waitForProfileData(profileId, signal);

  const achievementsTitle = document.querySelector(
    "#career_tab_content",
  )?.previousElementSibling;
  if (achievementsTitle) {
    const counters = [...document.querySelectorAll(".counter")].map(
      (counter) => counter.textContent ?? "",
    );
    mount(
      <AchievementsSummary
        total={sumAchievementCounters(counters)}
        citizenId={profileId}
      />,
      achievementsTitle,
      { position: "append", tagName: "span" },
    );
  }

  document.querySelectorAll(".rank_name_holder a").forEach((rank) => {
    const originalName = rank.textContent ?? "";
    const legendName = toLegendRankName(originalName);
    if (legendName) {
      rank.textContent = legendName;
      onCleanup(() => {
        rank.textContent = originalName;
      });
    }
  });
}
