import posthog from "posthog-js";
import { log } from "../utils/utils";
import { getCitizenId, getStuffVersion } from "../utils/erep-global-info";

let isInitialized = false;

export const Analytics = {
  init: () => {
    if (isInitialized) {
      return;
    }
    const key = process.env.REACT_APP_PUBLIC_POSTHOG_KEY
    if (!key) {
      log("PostHog key not found, skipping analytics initialization");
      return;
    }
    
    posthog.init(key, {
      api_host: "https://eu.i.posthog.com",
      person_profiles: "identified_only", // or 'always' to create profiles for anonymous users as well
      capture_pageview: false,
      capture_pageleave: "if_capture_pageview",
      autocapture: false,
    });
    isInitialized = true;
  },
  postFeaturesExecutedEvent: (event: FeaturesExecutedEvent) => {
    posthog.capture("features_executed", {
      ...event,
      ...defaultProperties(),
    });
  },
  postVipClaimSuccessEvent: () => {
    posthog.capture("vip_claim_success", {
      ...defaultProperties(),
    });
  },
  postVipClaimErrorEvent: (error: string) => {
    posthog.capture("vip_claim_error", {
      ...defaultProperties(),
      error,
    });
  },
  postWcCalculatorOpenedEvent: () => {
    posthog.capture("wc_calculator_opened", {
      ...defaultProperties(),
    });
  }
};

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