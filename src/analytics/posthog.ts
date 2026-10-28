import { log } from "../utils/utils";
import { getCitizenId, getStuffVersion } from "../utils/erep-global-info";

/**
 * Minimal PostHog client: the script only ever captured events,
 * so it talks to the capture API directly instead of bundling posthog-js.
 * https://posthog.com/docs/api/capture
 */
const CAPTURE_URL = "https://eu.i.posthog.com/i/v0/e/";
const DISTINCT_ID_KEY = "STUFF_UNLOCKED.analytics.distinctId";

let apiKey: string | undefined;
let distinctId: string | undefined;

export const Analytics = {
  init: () => {
    if (apiKey) {
      return;
    }
    const key = import.meta.env.VITE_PUBLIC_POSTHOG_KEY;
    if (!key) {
      log("PostHog key not found, skipping analytics initialization");
      return;
    }
    apiKey = key;
    distinctId = getDistinctId(key);
  },
  postFeaturesExecutedEvent: (event: FeaturesExecutedEvent) => {
    capture("features_executed", { ...event });
  },
  postVipClaimSuccessEvent: () => {
    capture("vip_claim_success");
  },
  postVipClaimErrorEvent: (error: string) => {
    capture("vip_claim_error", { error });
  },
  postWcCalculatorOpenedEvent: () => {
    capture("wc_calculator_opened");
  },
};

function capture(event: string, properties: Record<string, unknown> = {}) {
  if (!apiKey || !distinctId) {
    return;
  }
  // No content-type header: a text/plain body avoids a CORS preflight,
  // which is what posthog-js does as well.
  fetch(CAPTURE_URL, {
    method: "POST",
    keepalive: true,
    body: JSON.stringify({
      api_key: apiKey,
      event,
      distinct_id: distinctId,
      timestamp: new Date().toISOString(),
      properties: {
        ...properties,
        ...defaultProperties(),
        $current_url: window.location.href,
        $lib: "stuff-unlocked",
        // Same as posthog-js `person_profiles: "identified_only"`
        // for a user that is never identified.
        $process_person_profile: false,
      },
    }),
  }).catch((e) => log("Failed to send analytics event", event, e));
}

/**
 * Reuses the anonymous id that posthog-js stored, so existing users keep it,
 * otherwise creates and stores a new one.
 */
function getDistinctId(key: string): string {
  try {
    const posthogJsState = localStorage.getItem(posthogJsPersistenceName(key));
    const posthogJsId =
      posthogJsState &&
      (JSON.parse(posthogJsState) as { distinct_id?: unknown }).distinct_id;
    if (typeof posthogJsId === "string" && posthogJsId) {
      return posthogJsId;
    }

    const storedId = localStorage.getItem(DISTINCT_ID_KEY);
    if (storedId) {
      return storedId;
    }
    const newId = crypto.randomUUID();
    localStorage.setItem(DISTINCT_ID_KEY, newId);
    return newId;
  } catch {
    return crypto.randomUUID();
  }
}

/** Mirrors how posthog-js names its persistence entry. */
function posthogJsPersistenceName(key: string): string {
  const token = key
    .replace(/\+/g, "PL")
    .replace(/\//g, "SL")
    .replace(/=/g, "EQ");
  return `ph_${token}_posthog`;
}

function defaultProperties() {
  return {
    citizenId: getCitizenId(),
    stuffVersion: getStuffVersion(),
  };
}

interface FeaturesExecutedEvent {
  features: Record<string, FeatureExecutionStatus>;
  totalTimeSpentMs: number;
}

export interface FeatureExecutionStatus {
  timeSpentMs?: number;
  success?: boolean;
  error?: string;
  skipped?: string;
}
