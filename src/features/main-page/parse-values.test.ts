import { describe, expect, it, vi } from "vitest";

vi.mock("../../utils/erep-global-info", () => ({ isOnHomepage: () => false }));

const { parseValues } = await import("./index");

describe("parseValues", () => {
  it("parses a 'current / total' string with thousands separators", () => {
    expect(parseValues("1,234 / 5,678")).toEqual({
      current: 1234,
      total: 5678,
    });
  });
});
