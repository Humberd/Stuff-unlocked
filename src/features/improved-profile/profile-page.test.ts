import { describe, expect, it } from "vitest";
import {
  getFullSizeAvatarUrl,
  isProfilePage,
  isProfileSubpage,
  parseProfileCitizenId,
  sumAchievementCounters,
  toLegendRankName,
} from "./profile-page";

describe("isProfilePage / isProfileSubpage", () => {
  it("recognizes the profile and the pages with its sidebar", () => {
    expect(isProfilePage("/en/citizen/profile/123")).toBe(true);
    expect(isProfilePage("/en/main/citizen-friends/123")).toBe(false);
    expect(isProfileSubpage("/en/economy/donate-items/123")).toBe(true);
    expect(isProfileSubpage("/en/economy/citizen-accounts/123")).toBe(true);
    expect(isProfileSubpage("/en/main/citizen-friends/123")).toBe(true);
    expect(isProfileSubpage("/en/economy/marketplace")).toBe(false);
  });
});

describe("parseProfileCitizenId", () => {
  it("takes the first numeric path segment", () => {
    expect(parseProfileCitizenId("/en/citizen/profile/1234567")).toBe(1234567);
    expect(parseProfileCitizenId("/en/citizen/profile/1234567/")).toBe(1234567);
    expect(parseProfileCitizenId("/en/main/citizen-friends/42/2")).toBe(42);
    expect(parseProfileCitizenId("/en/economy/donate-money/42")).toBe(42);
  });

  it("is undefined without an id", () => {
    expect(parseProfileCitizenId("/en/citizen/profile/")).toBeUndefined();
    expect(parseProfileCitizenId("/en/citizen/profile/abc")).toBeUndefined();
  });
});

describe("getFullSizeAvatarUrl", () => {
  const fullSize =
    "https://erpk-static-avatars.s3.amazonaws.com/avatars/Citizens/2020/01/01/a.jpg";

  it("reads quoted and unquoted urls", () => {
    expect(
      getFullSizeAvatarUrl(
        'background-image: url("https://cdnt.erepublik.net/x=/150x150/smart/avatars/Citizens/2020/01/01/a.jpg");',
      ),
    ).toBe(fullSize);
    expect(
      getFullSizeAvatarUrl(
        "background-image: url(https://cdnt.erepublik.net/x=/150x150/smart/avatars/Citizens/2020/01/01/a.jpg)",
      ),
    ).toBe(fullSize);
  });

  it("is undefined for other urls", () => {
    expect(
      getFullSizeAvatarUrl("background-image: url(/images/default.png)"),
    ).toBeUndefined();
  });
});

describe("sumAchievementCounters", () => {
  it("sums the counters and skips the unreadable ones", () => {
    expect(sumAchievementCounters(["3", " 12 ", "1,000", ""])).toBe(1015);
    expect(sumAchievementCounters(["x"])).toBe(0);
    expect(sumAchievementCounters([])).toBe(0);
  });
});

describe("toLegendRankName", () => {
  it("renames the Battalion ranks", () => {
    expect(toLegendRankName("Battalion II")).toBe("Legend II");
    expect(toLegendRankName("Titan***")).toBeUndefined();
  });
});
