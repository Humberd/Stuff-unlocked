import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  isSettingEnabled,
  readStuffData,
  setSettingEnabled,
  updateStuffData,
} from "./stuff-settings";

vi.mock("../utils/utils", async (importOriginal) => ({
  ...(await importOriginal()),
  error: vi.fn(),
}));

describe("stuff settings", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("turns display features on by default", () => {
    expect(isSettingEnabled("xpLeft")).toBe(true);
  });

  it("turns automatic features off by default", () => {
    expect(isSettingEnabled("energyRecovery")).toBe(false);
  });

  it("reads the legacy encoding, where true means turned off", () => {
    localStorage.setItem(
      "stuff",
      JSON.stringify({ xpLeft: true, autoRefresh: false }),
    );

    expect(isSettingEnabled("xpLeft")).toBe(false);
    expect(isSettingEnabled("autoRefresh")).toBe(true);
  });

  it("saves a setting and keeps the rest of the data", () => {
    localStorage.setItem("stuff", JSON.stringify({ version: "5.76" }));

    setSettingEnabled("energyRecovery", true);
    setSettingEnabled("xpLeft", false);

    expect(isSettingEnabled("energyRecovery")).toBe(true);
    expect(isSettingEnabled("xpLeft")).toBe(false);
    expect(readStuffData().version).toBe("5.76");
  });

  it("merges data into what is stored", () => {
    setSettingEnabled("xpLeft", false);

    updateStuffData({ version: "6.0", contributors: [1] });

    expect(readStuffData()).toMatchObject({
      version: "6.0",
      contributors: [1],
    });
    expect(isSettingEnabled("xpLeft")).toBe(false);
  });

  it("treats corrupted data as no settings", () => {
    localStorage.setItem("stuff", "{oops");

    expect(isSettingEnabled("xpLeft")).toBe(true);
  });
});
