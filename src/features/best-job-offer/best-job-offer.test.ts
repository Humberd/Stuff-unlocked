import { describe, expect, it } from "vitest";
import { describeSalaryLimit, findBestJobOffer } from "./best-job-offer";

describe("findBestJobOffer", () => {
  it("finds the highest net salary", () => {
    const offers = [
      { id: 1, netSalary: 10 },
      { id: 2, netSalary: 30 },
      { id: 3, netSalary: 20 },
      { id: 4, netSalary: 30 },
    ];

    expect(findBestJobOffer(offers)?.id).toBe(2);
  });

  it("is undefined without offers", () => {
    expect(findBestJobOffer([])).toBeUndefined();
  });
});

describe("describeSalaryLimit", () => {
  it("describes the daily limit", () => {
    expect(describeSalaryLimit(1234)).toBe("max 1,234cc/day");
    expect(describeSalaryLimit(0)).toBe("no overtime limit");
  });
});
