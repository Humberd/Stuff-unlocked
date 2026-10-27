import { describe, expect, it } from "vitest";
import { DonatorsData, getDonatorBorderUrls } from "./donators";

const donatorLevels: DonatorsData["donatorLevels"] = {
  "3M": { minimalDonation: 3_000_000, borderUrl: "3m.png" },
  "1M": { minimalDonation: 1_000_000, borderUrl: "1m.png" },
};

describe("getDonatorBorderUrls", () => {
  it("uses the highest level the total donations reach", () => {
    const borderUrls = getDonatorBorderUrls({
      donatorLevels,
      donators: {
        "1": { donations: [1_000_000] },
        "2": { donations: [2_000_000, 1_500_000] },
      },
    });

    expect(borderUrls.get("1")).toBe("1m.png");
    expect(borderUrls.get("2")).toBe("3m.png");
  });

  it("skips donators below the lowest level", () => {
    const borderUrls = getDonatorBorderUrls({
      donatorLevels,
      donators: { "1": { donations: [999_999] }, "2": { donations: [] } },
    });

    expect(borderUrls.size).toBe(0);
  });

  it("prefers a custom border", () => {
    const borderUrls = getDonatorBorderUrls({
      donatorLevels,
      donators: { "1": { donations: [], customBorderUrl: "custom.png" } },
    });

    expect(borderUrls.get("1")).toBe("custom.png");
  });
});
