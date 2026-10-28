import { describe, expect, it } from "vitest";
import type * as CitizenProfileJson from "../../requests/citizen-profile-json-request";
import type * as CitizenHovercard from "../../requests/citizen-hovercard-request";
import {
  containsId,
  describeAirHit,
  describeGroundHit,
  formatStrength,
  getAchievementIcons,
  getActivePacks,
  getBadges,
  getDateLine,
  getMilitaryUnitRole,
  getPartyRole,
  getRankLabel,
  getResidenceStatus,
  getXpBar,
  parsePlayerId,
  truncate,
  type HovercardData,
} from "./hovercard-data";

function createProfile(
  overrides: Partial<CitizenProfileJson.Response> = {},
  citizen: Partial<CitizenProfileJson.Citizen> = {},
): CitizenProfileJson.Response {
  return {
    citizen: {
      name: "Player",
      avatar: "avatar.png",
      level: 50,
      nextLevelXp: 10_000,
      onlineStatus: false,
      is_organization: false,
      is_alive: true,
      banStatus: { type: null },
      created_at: "Jan 1, 2010",
      ...citizen,
    },
    citizenAttributes: { experience_points: 7_500 },
    achievements: [],
    activePacks: {},
    isDictator: false,
    isModerator: false,
    isPresident: false,
    isCongressman: false,
    isPartyPresident: false,
    title: { country: null },
    location: {
      citizenshipCountry: { name: "Poland", permalink: "Poland" },
      residenceCountry: { name: "Poland", permalink: "Poland" },
      residenceRegion: { id: 1, name: "Mazovia" },
    },
    city: { residenceCityId: null, residenceCity: null },
    military: {
      militaryData: {
        ground: { name: "Private", icon: "", rankNumber: 1, progress: 0 },
        aircraft: { name: "Airman", icon: "", rankNumber: 1, progress: 0 },
      },
      militaryUnit: null,
    },
    partyData: null,
    ...overrides,
  };
}

function createHovercard(
  military: Partial<CitizenHovercard.Response["fighterInfo"]["military"]> = {},
  overrides: Partial<CitizenHovercard.Response> = {},
): CitizenHovercard.Response {
  return {
    level: 50,
    bornOn: "Jan 1, 2010",
    interactionButtons: [],
    fighterInfo: {
      military: { strength: 1_000, division: 4, rank: 70, ...military },
      aviation: { rank: 50, perception: 0, damagePerHitNoWeapon: 1_234 },
    },
    ...overrides,
  };
}

function createUnit(
  overrides: Partial<CitizenProfileJson.MilitaryUnit> = {},
): CitizenProfileJson.MilitaryUnit {
  return {
    name: "Unit",
    avatar: "",
    leader_id: 1,
    second_commander_1: 2,
    second_commander_2: null,
    leaders: [{ citizen_id: 3 }],
    ...overrides,
  };
}

describe("parsePlayerId", () => {
  it("reads the id from a profile link", () => {
    expect(
      parsePlayerId("https://www.erepublik.com/en/citizen/profile/1234"),
    ).toBe("1234");
  });

  it("ignores links that aren't to a profile", () => {
    expect(
      parsePlayerId("https://www.erepublik.com/en/citizen/profile-edit"),
    ).toBeUndefined();
  });
});

describe("getXpBar", () => {
  it("fills every 5,000 XP", () => {
    expect(getXpBar(createProfile()).percent).toBe(50);
  });

  it("marks high levels close to the next level", () => {
    const close = createProfile(
      { citizenAttributes: { experience_points: 9_600 } },
      { level: 70 },
    );
    const lowLevel = createProfile(
      { citizenAttributes: { experience_points: 9_600 } },
      { level: 69 },
    );

    expect(getXpBar(close).isNearLevelUp).toBe(true);
    expect(getXpBar(lowLevel).isNearLevelUp).toBe(false);
    expect(getXpBar(createProfile({}, { level: 70 })).isNearLevelUp).toBe(
      false,
    );
  });
});

describe("getRankLabel", () => {
  const legend = {
    name: "Titan Battalion III",
    icon: "",
    rankNumber: 70,
    progress: 0,
  };

  it("shortens the ground ranks of legends", () => {
    expect(getRankLabel(legend, "ground")).toBe("Legend III");
  });

  it("keeps other ranks", () => {
    expect(getRankLabel(legend, "air")).toBe("Titan Battalion III");
    expect(getRankLabel({ ...legend, rankNumber: 69 }, "ground")).toBe(
      "Titan Battalion III",
    );
    expect(getRankLabel({ ...legend, name: "God of War" }, "ground")).toBe(
      "God of War",
    );
  });
});

describe("hits", () => {
  it("describes the Q7 hit with the True Patriot hit", () => {
    expect(
      describeGroundHit(
        createHovercard({ damagePerHit: 12_345, damagePerHitLegend: 23_456 }),
      ),
    ).toBe("Q7 hit: 12,345 (TP 23,456)");
  });

  it("leaves the True Patriot hit out when there is none", () => {
    expect(
      describeGroundHit(
        createHovercard({ damagePerHit: 12_345, damagePerHitLegend: 0 }),
      ),
    ).toBe("Q7 hit: 12,345");
  });

  it("computes the hits the game no longer sends", () => {
    // 10 * (1 + 400 / 400) * (1 + 5 / 5) * 3
    expect(describeGroundHit(createHovercard({ strength: 400, rank: 5 }))).toBe(
      "Q7 hit: 120",
    );
    expect(
      describeAirHit(
        createHovercard(
          {},
          {
            fighterInfo: {
              military: { strength: 0, division: 11, rank: 0 },
              aviation: { rank: 5, perception: 400 },
            },
          },
        ),
      ),
    ).toBe("Q0 hit: 40");
  });

  it("describes the Q0 air hit", () => {
    expect(describeAirHit(createHovercard())).toBe("Q0 hit: 1,234");
  });

  it("formats the strength with two decimals", () => {
    expect(formatStrength(createHovercard({ strength: 123_456.7 }))).toBe(
      "123,456.70",
    );
  });
});

describe("getPartyRole", () => {
  it("prefers the highest office", () => {
    expect(
      getPartyRole(
        createProfile({
          isPresident: true,
          isCongressman: true,
          title: { country: "Minister of Defense" },
        }),
      ),
    ).toBe("Country President");
    expect(
      getPartyRole(
        createProfile({
          isCongressman: true,
          title: { country: "Minister of Defense" },
        }),
      ),
    ).toBe("Minister of Defense");
    expect(
      getPartyRole(
        createProfile({ isCongressman: true, isPartyPresident: true }),
      ),
    ).toBe("Congressman");
    expect(getPartyRole(createProfile({ isPartyPresident: true }))).toBe(
      "Party President",
    );
  });

  it("tells party members from players without a party", () => {
    expect(
      getPartyRole(createProfile({ partyData: { name: "P", avatar: "" } })),
    ).toBe("Member");
    expect(getPartyRole(createProfile({ title: undefined }))).toBe(
      "No political activity",
    );
  });
});

describe("getMilitaryUnitRole", () => {
  it("finds the role of the player in the unit", () => {
    const unit = createUnit();

    expect(getMilitaryUnitRole(unit, "1")).toBe("Commander");
    expect(getMilitaryUnitRole(unit, "2")).toBe("Second Commander");
    expect(getMilitaryUnitRole(unit, "3")).toBe("Captain");
    expect(getMilitaryUnitRole(unit, "4")).toBe("Soldier");
  });

  it("doesn't take a captain's id containing the player's id for theirs", () => {
    expect(
      getMilitaryUnitRole(createUnit({ leaders: { a: "1234" } }), "123"),
    ).toBe("Soldier");
  });

  it("is empty without a unit", () => {
    expect(getMilitaryUnitRole(null, "1")).toBe("");
  });
});

describe("containsId", () => {
  it("finds ids nested anywhere, as numbers or strings", () => {
    expect(containsId([{ a: { b: [5] } }], "5")).toBe(true);
    expect(containsId({ a: "5" }, "5")).toBe(true);
    expect(containsId({ a: null, b: true }, "5")).toBe(false);
  });
});

describe("getResidenceStatus", () => {
  it("tells whether the player is in their residence region", () => {
    const withResidence = (regionId: number) =>
      createProfile({
        city: { residenceCityId: 10, residenceCity: { region_id: regionId } },
      });

    expect(getResidenceStatus(withResidence(1))).toBe("inResidenceRegion");
    expect(getResidenceStatus(withResidence(2))).toBe("away");
    expect(getResidenceStatus(createProfile())).toBe("noResidence");
  });
});

describe("truncate", () => {
  it("shortens long texts with an ellipsis", () => {
    expect(truncate("abcdef", 6)).toBe("abcdef");
    expect(truncate("abcdefg", 6)).toBe("abcde…");
  });
});

describe("getBadges", () => {
  const labels = (data: HovercardData, isContributor = false) =>
    getBadges(data, isContributor).map((badge) => badge.label);

  it("is empty for an ordinary player", () => {
    expect(
      labels({ profile: createProfile(), hovercard: createHovercard() }),
    ).toEqual([]);
  });

  it("lists every badge that applies", () => {
    const data = {
      profile: createProfile(
        { isModerator: true },
        {
          is_organization: true,
          is_alive: false,
          banStatus: { type: "Permanently" },
        },
      ),
      hovercard: createHovercard(
        {},
        { interactionButtons: [{ type: "removeFriend" }] },
      ),
    };

    expect(labels(data, true)).toEqual([
      "Organization",
      "Friend",
      "Dead",
      "Permaban",
      "Stuff++ contributor",
      "Mod",
    ]);
  });

  it("tells a tempban from a permaban", () => {
    const data = {
      profile: createProfile({}, { banStatus: { type: "Temporary" } }),
      hovercard: createHovercard({}, { interactionButtons: undefined }),
    };

    expect(labels(data)).toEqual(["Tempban"]);
  });
});

describe("getDateLine", () => {
  it("shows the eRepublik birthday of players and the creation date of organizations", () => {
    const hovercard = createHovercard({}, { bornOn: "Feb 2, 2012" });

    expect(getDateLine({ profile: createProfile(), hovercard })).toBe(
      "eR birthday: Feb 2, 2012",
    );
    expect(
      getDateLine({
        profile: createProfile({}, { is_organization: true }),
        hovercard,
      }),
    ).toBe("Created at: Jan 1, 2010");
  });
});

describe("getActivePacks", () => {
  it("lists the active packs", () => {
    expect(
      getActivePacks(
        createProfile({
          activePacks: { power_pack: 123, division_switch_pack: 456 },
        }),
      ),
    ).toEqual(["PP", "MP"]);
  });
});

describe("getAchievementIcons", () => {
  it("skips Hard Worker and Super Soldier and shortens big counts", () => {
    const profile = createProfile({
      achievements: {
        0: { img: "hardworker", count: 10 },
        1: { img: "supersoldier", count: 10 },
        2: { img: "battlehero", count: 12_345 },
        3: { img: "mercenary", count: 0 },
      },
    });

    expect(getAchievementIcons(profile)).toEqual([
      {
        iconUrl:
          "//www.erepublik.net/images/achievements/icon_battlehero_on.gif",
        count: "12k",
      },
      {
        iconUrl:
          "//www.erepublik.net/images/achievements/icon_mercenary_off.gif",
        count: "0",
      },
    ]);
  });
});
