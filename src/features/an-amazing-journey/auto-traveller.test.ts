import { describe, expect, it, vi } from "vitest";
import {
  AutoTraveller,
  type AutoTravelForm,
  type AutoTravellerDeps,
  TravelProgressStatus,
} from "./auto-traveller";

vi.mock("../../utils/utils", async (importOriginal) => ({
  ...(await importOriginal()),
  log: vi.fn(),
  error: vi.fn(),
}));

const route = { regionIdA: "A", regionIdB: "B" };

const form: AutoTravelForm = {
  targetDistanceKm: "250",
  resourceUsed: "preferTicket",
  travelBackAfterFinish: false,
};

const travelInfo = { distanceKm: 100, ticketCost: 1, currencyCost: 10 };

/** Travels 100 km for 1 ticket and 10 currency, and tracks the current region. */
function createDeps() {
  let currentRegionId = "A";
  return {
    getCurrentRegionId: vi.fn<AutoTravellerDeps["getCurrentRegionId"]>(() =>
      Promise.resolve(currentRegionId),
    ),
    travel: vi.fn<AutoTravellerDeps["travel"]>((regionId) => {
      currentRegionId = regionId;
      return Promise.resolve(travelInfo);
    }),
    getCurrencyName: () => "PLN",
    sleep: vi.fn<AutoTravellerDeps["sleep"]>(() => Promise.resolve()),
  };
}

function travelledRegions(deps: ReturnType<typeof createDeps>) {
  return deps.travel.mock.calls.map(([regionId]) => regionId);
}

describe("AutoTraveller", () => {
  it("travels back and forth until the target distance is reached", async () => {
    const deps = createDeps();
    const traveller = new AutoTraveller(route, deps);

    await traveller.start(form);

    expect(travelledRegions(deps)).toEqual(["B", "A", "B"]);
    expect(traveller.progress.get()).toEqual({
      status: TravelProgressStatus.Completed,
      travelsCompleted: 3,
      travelledDistanceKm: 300,
      resourcesSpent: { amount: 3, unit: "tickets" },
      errorMessage: undefined,
    });
    expect(traveller.state.get()).toBe("idle");
  });

  it("never starts a travel before the previous one finished", async () => {
    let inFlight = 0;
    let maxInFlight = 0;
    const deps = createDeps();
    deps.travel.mockImplementation(async () => {
      maxInFlight = Math.max(maxInFlight, ++inFlight);
      await new Promise((resolve) => setTimeout(resolve, 1));
      inFlight--;
      return travelInfo;
    });

    await new AutoTraveller(route, deps).start(form);

    expect(maxInFlight).toBe(1);
  });

  it("counts currency when it prefers currency", async () => {
    const deps = createDeps();
    const traveller = new AutoTraveller(route, deps);

    await traveller.start({ ...form, resourceUsed: "preferCurrency" });

    expect(traveller.progress.get()?.resourcesSpent).toEqual({
      amount: 30,
      unit: "PLN",
    });
  });

  it("travels back to the initial region when asked to", async () => {
    const deps = createDeps();

    await new AutoTraveller(route, deps).start({
      ...form,
      travelBackAfterFinish: true,
    });

    expect(travelledRegions(deps)).toEqual(["B", "A", "B", "A"]);
  });

  it("stops before the next travel", async () => {
    const deps = createDeps();
    const traveller = new AutoTraveller(route, deps);
    deps.sleep.mockImplementationOnce(() => {
      traveller.stop();
      return Promise.resolve();
    });

    await traveller.start(form);

    expect(travelledRegions(deps)).toEqual(["B"]);
    expect(traveller.progress.get()?.status).toBe(
      TravelProgressStatus.Completed,
    );
  });

  it("reports an error and still travels back", async () => {
    const deps = createDeps();
    deps.travel
      .mockImplementationOnce(deps.travel.getMockImplementation()!)
      .mockRejectedValueOnce(new Error("No tickets"));
    const traveller = new AutoTraveller(route, deps);

    await traveller.start({ ...form, travelBackAfterFinish: true });

    expect(travelledRegions(deps)).toEqual(["B", "A", "A"]);
    expect(traveller.errors.get().map((e) => e.message)).toEqual([
      "No tickets",
    ]);
    expect(traveller.progress.get()).toMatchObject({
      status: TravelProgressStatus.Error,
      errorMessage: "No tickets",
    });
    expect(traveller.state.get()).toBe("idle");
  });

  it("ignores start while a journey is running", async () => {
    const deps = createDeps();
    const traveller = new AutoTraveller(route, deps);

    const first = traveller.start(form);
    await traveller.start(form);
    await first;

    expect(deps.travel).toHaveBeenCalledTimes(3);
  });
});
