import { beforeEach, describe, expect, it, vi } from "vitest";
import * as MyCompaniesHtml from "../../requests/my-companies-html-request";
import { refreshPage } from "./refresh-page";

vi.mock("../../requests/my-companies-html-request");

const sidebar = (gold: string, money: string, energy: string, bar: string) => `
  <strong id="side_bar_gold_account_value">${gold}</strong>
  <strong id="side_bar_currency_account_value">${money}</strong>
  <q id="currentEnergy">${energy}</q>
  <div class="currentEnergyBar" style="width: ${bar}"></div>
  <div class="potentialEnergyBar" style="width: ${bar}"></div>`;

describe("refreshPage", () => {
  const getData = vi.fn();
  const citizen = { energy: 2298 };

  beforeEach(() => {
    document.body.innerHTML = sidebar("68", "276,806", "2,298", "99.91%");
    citizen.energy = 2298;
    vi.stubGlobal("erepublik", { citizen });
    vi.stubGlobal("Environment", { isOnHomepage: true });
    vi.stubGlobal("angular", {
      element: () => ({ scope: () => ({ getData }) }),
    });
    vi.mocked(MyCompaniesHtml.sendRequest).mockResolvedValue(
      sidebar("80", "273,543", "2,148", "93.39%"),
    );
  });

  it("brings the money, gold and energy up to date", async () => {
    await refreshPage();

    const text = (selector: string) =>
      document.querySelector(selector)?.textContent;
    expect(text("#side_bar_gold_account_value")).toBe("80");
    expect(text("#side_bar_currency_account_value")).toBe("273,543");
    expect(text("#currentEnergy")).toBe("2,148");
    expect(
      document.querySelector<HTMLElement>(".currentEnergyBar")?.style.width,
    ).toBe("93.39%");
    expect(citizen.energy).toBe(2148);
  });

  it("reloads the weekly challenge on the homepage", async () => {
    await refreshPage();

    expect(getData).toHaveBeenCalled();
  });

  it("leaves alone pages without the weekly challenge", async () => {
    vi.stubGlobal("Environment", { isOnHomepage: false });

    await refreshPage();

    expect(getData).not.toHaveBeenCalled();
  });

  it("keeps what's shown when the fresh page lacks it", async () => {
    vi.mocked(MyCompaniesHtml.sendRequest).mockResolvedValue("<div></div>");

    await refreshPage();

    expect(document.querySelector("#currentEnergy")?.textContent).toBe("2,298");
    expect(citizen.energy).toBe(2298);
  });
});
