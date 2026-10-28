import { onXhrLoad } from "../../utils/xhr";

const PROFILE_DATA_TIMEOUT_MS = 15_000;

/** A military rank of the profile, `ground` or `aircraft`. */
export interface ProfileMilitaryUnit {
  rankNumber: number;
  /** Rank points so far. */
  points: number;
  /** Rank points the next rank starts at. */
  nextRankAt: number;
  /** Strength with the active boosters, missing for aircraft. */
  temporaryStrength?: number;
}

/**
 * The profile data the page renders, kept by Angular in the scope of
 * `#str_progress`. Only the used fields are typed.
 */
export interface ProfilePageData {
  military: {
    militaryData: {
      ground: ProfileMilitaryUnit;
      aircraft: ProfileMilitaryUnit;
    };
  };
  /** An empty array when there are no active packs. */
  activePacks?: { war_stash?: unknown };
}

/**
 * Resolves with the profile data once the page has loaded and rendered it.
 * Rejects when it doesn't load within a while.
 */
export function waitForProfileData(
  citizenId: number,
  signal: AbortSignal,
): Promise<ProfilePageData> {
  const loaded = readProfileScopeData();
  if (loaded) {
    return Promise.resolve(loaded);
  }

  return new Promise((resolve, reject) => {
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => {
      stop();
      reject(new Error("The profile data didn't load"));
    }, PROFILE_DATA_TIMEOUT_MS);
    function stop() {
      controller.abort();
      window.clearTimeout(timeoutId);
    }

    signal.addEventListener(
      "abort",
      () => {
        stop();
        reject(new Error("The profile page was left"));
      },
      { signal: controller.signal },
    );
    onXhrLoad(
      // Hovercards load other citizens' data from the same endpoints
      new RegExp(`/citizen-profile-json(?:-personal)?/${citizenId}(?:[/?]|$)`),
      (response) => {
        // The scope has the personal data even when the other request came first
        const data =
          readProfileScopeData() ??
          (isProfilePageData(response) ? response : undefined);
        if (data) {
          stop();
          resolve(data);
        }
      },
      { signal: controller.signal },
    );
  });
}

function readProfileScopeData(): ProfilePageData | undefined {
  const element = document.querySelector("#str_progress");
  if (!element) {
    return undefined;
  }
  const scope = angular.element(element).scope() as
    | { data?: unknown }
    | undefined;
  return isProfilePageData(scope?.data) ? scope.data : undefined;
}

function isProfilePageData(value: unknown): value is ProfilePageData {
  const militaryData = (
    value as { military?: { militaryData?: { ground?: unknown } } } | undefined
  )?.military?.militaryData;
  return (
    typeof militaryData?.ground === "object" && militaryData.ground !== null
  );
}
