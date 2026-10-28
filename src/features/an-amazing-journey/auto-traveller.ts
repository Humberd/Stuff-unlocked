import { ExternalProperty } from "../../hooks/external-property";
import { error, log, toError } from "../../utils/utils";
import type { TravelRoute } from "./regions";
import type { TravelInfo } from "./travel";

/** Time between travels, so that we don't spam the server. */
export const TRAVEL_INTERVAL_MS = 5_000;

export interface AutoTravelForm {
  targetDistanceKm: string;
  resourceUsed: "preferCurrency" | "preferTicket";
  travelBackAfterFinish: boolean;
}

export type AutoTravellerState = "idle" | "running" | "stopping";

export const TravelProgressStatus = {
  InProgress: 0,
  Completed: 1,
  Error: 2,
} as const;
export type TravelProgressStatus =
  (typeof TravelProgressStatus)[keyof typeof TravelProgressStatus];

export interface TravelProgressState {
  status: TravelProgressStatus;
  travelsCompleted: number;
  travelledDistanceKm: number;
  resourcesSpent: TravelResource;
  errorMessage?: string;
}

export interface TravelResource {
  amount: number;
  unit: string;
}

export interface AutoTravellerDeps {
  /** Fetches the region the citizen is in right now. */
  getCurrentRegionId: () => Promise<string>;
  travel: (regionId: string, form: AutoTravelForm) => Promise<TravelInfo>;
  getCurrencyName: () => string;
  sleep: (ms: number) => Promise<unknown>;
}

/**
 * Travels back and forth between the two regions of a route
 * until the target distance is reached or it is stopped.
 */
export class AutoTraveller {
  readonly state = new ExternalProperty<AutoTravellerState>("idle");
  readonly progress = new ExternalProperty<TravelProgressState | undefined>(
    undefined,
  );
  readonly errors = new ExternalProperty<Error[]>([]);

  private readonly route: TravelRoute;
  private readonly deps: AutoTravellerDeps;
  private isStopRequested = false;

  constructor(route: TravelRoute, deps: AutoTravellerDeps) {
    this.route = route;
    this.deps = deps;
  }

  /** Resolves once the journey is over. Never rejects, errors go to {@link errors}. */
  async start(form: AutoTravelForm): Promise<void> {
    if (this.state.get() !== "idle") {
      return;
    }
    log("Starting...", form);
    this.isStopRequested = false;
    this.state.update("running");
    this.progress.update({
      status: TravelProgressStatus.InProgress,
      travelsCompleted: 0,
      travelledDistanceKm: 0,
      resourcesSpent: {
        amount: 0,
        unit:
          form.resourceUsed === "preferCurrency"
            ? this.deps.getCurrencyName()
            : "tickets",
      },
    });

    let errorMessage: string | undefined;
    let initialRegionId: string | undefined;
    try {
      initialRegionId = await this.deps.getCurrentRegionId();
      await this.travelUntilDone(initialRegionId, form);
    } catch (e) {
      errorMessage = this.addError(e).message;
    }

    try {
      if (initialRegionId && form.travelBackAfterFinish) {
        await this.travelBack(initialRegionId, form);
      }
    } catch (e) {
      errorMessage ??= this.addError(e).message;
    }

    this.updateProgress((progress) => ({
      ...progress,
      status: errorMessage
        ? TravelProgressStatus.Error
        : TravelProgressStatus.Completed,
      errorMessage,
    }));
    // Start is enabled again only after a while, to not spam the server
    this.state.update("stopping");
    await this.deps.sleep(TRAVEL_INTERVAL_MS);
    this.state.update("idle");
  }

  /** Stops before the next travel. */
  stop() {
    if (this.state.get() !== "running") {
      return;
    }
    log("Stopping manually...");
    this.isStopRequested = true;
    this.state.update("stopping");
  }

  clearErrors() {
    this.errors.update([]);
  }

  private async travelUntilDone(initialRegionId: string, form: AutoTravelForm) {
    const targetDistanceKm = Number(form.targetDistanceKm);
    let targetRegionId = this.otherRegionThan(initialRegionId);
    let travelledDistanceKm = 0;

    while (!this.isStopRequested) {
      const travelInfo = await this.deps.travel(targetRegionId, form);
      this.recordTravel(travelInfo, form);
      travelledDistanceKm += travelInfo.distanceKm;
      if (travelledDistanceKm >= targetDistanceKm) {
        return;
      }
      targetRegionId = this.otherRegionThan(targetRegionId);
      await this.deps.sleep(TRAVEL_INTERVAL_MS);
    }
  }

  private async travelBack(initialRegionId: string, form: AutoTravelForm) {
    if ((await this.deps.getCurrentRegionId()) === initialRegionId) {
      return;
    }
    log(`Waiting ${TRAVEL_INTERVAL_MS}ms to travel back...`);
    await this.deps.sleep(TRAVEL_INTERVAL_MS);
    this.recordTravel(await this.deps.travel(initialRegionId, form), form);
  }

  private otherRegionThan(regionId: string) {
    return regionId === this.route.regionIdA
      ? this.route.regionIdB
      : this.route.regionIdA;
  }

  private recordTravel(travelInfo: TravelInfo, form: AutoTravelForm) {
    const spent =
      form.resourceUsed === "preferTicket"
        ? travelInfo.ticketCost
        : travelInfo.currencyCost;
    this.updateProgress((progress) => ({
      ...progress,
      travelsCompleted: progress.travelsCompleted + 1,
      travelledDistanceKm: progress.travelledDistanceKm + travelInfo.distanceKm,
      resourcesSpent: {
        ...progress.resourcesSpent,
        amount: progress.resourcesSpent.amount + spent,
      },
    }));
  }

  private updateProgress(
    update: (progress: TravelProgressState) => TravelProgressState,
  ) {
    const progress = this.progress.get();
    if (progress) {
      this.progress.update(update(progress));
    }
  }

  private addError(value: unknown): Error {
    const err = toError(value);
    error(err);
    this.errors.update([...this.errors.get(), err]);
    return err;
  }
}
