import { describe, expect, it } from "vitest";
import { parseMyCompanies } from "./my-companies-html-request";

describe("parseMyCompanies", () => {
  it("reads the companies and the energy from the page scripts", () => {
    const html = `
      <script>
        var companies = {"1":{"id":1,"can_work_as_manager":true,"already_worked":false},"2":{"id":2,"can_work_as_manager":true,"already_worked":true}};
        var holdingCompanies = {"9":{"id":9}};
        var pageDetails = {"total_works":"0","health":1114,"next_overtime_work":1793672594};
      </script>`;

    expect(parseMyCompanies(html)).toEqual({
      companies: [
        { id: 1, can_work_as_manager: true, already_worked: false },
        { id: 2, can_work_as_manager: true, already_worked: true },
      ],
      energy: 1114,
    });
  });

  it("throws when the page has changed", () => {
    expect(() => parseMyCompanies("<p></p>")).toThrow("Can't find companies");
  });
});
