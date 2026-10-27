import { beforeEach, describe, expect, it, vi, type Mock } from "vitest";

vi.mock("../utils/erep-global-info", () => ({
  getCitizenId: () => 123,
  getStuffVersion: () => "9.9",
}));

async function loadAnalytics(key: string | undefined) {
  vi.resetModules();
  vi.stubEnv("VITE_PUBLIC_POSTHOG_KEY", key);
  const fetchMock = vi.fn<typeof fetch>(async () => new Response("{}"));
  vi.stubGlobal("fetch", fetchMock);
  const { Analytics } = await import("./posthog");
  return { Analytics, fetchMock };
}

function sentBody(fetchMock: Mock<typeof fetch>) {
  const [, init] = fetchMock.mock.calls[0];
  return JSON.parse(init?.body as string);
}

describe("Analytics", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("does not send anything without a key", async () => {
    const { Analytics, fetchMock } = await loadAnalytics(undefined);

    Analytics.init();
    Analytics.postVipClaimSuccessEvent();

    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("sends an anonymous event to the EU capture endpoint", async () => {
    const { Analytics, fetchMock } = await loadAnalytics("phc_test");

    Analytics.init();
    Analytics.postVipClaimErrorEvent("oops");

    expect(fetchMock.mock.calls[0][0]).toBe("https://eu.i.posthog.com/i/v0/e/");
    expect(sentBody(fetchMock)).toMatchObject({
      api_key: "phc_test",
      event: "vip_claim_error",
      distinct_id: expect.any(String),
      properties: {
        error: "oops",
        citizenId: 123,
        stuffVersion: "9.9",
        $process_person_profile: false,
      },
    });
  });

  it("reuses the distinct id stored by posthog-js", async () => {
    localStorage.setItem(
      "ph_phc_aPLbSLcEQ_posthog",
      JSON.stringify({ distinct_id: "existing-id" }),
    );
    const { Analytics, fetchMock } = await loadAnalytics("phc_a+b/c=");

    Analytics.init();
    Analytics.postWcCalculatorOpenedEvent();

    expect(sentBody(fetchMock).distinct_id).toBe("existing-id");
  });

  it("keeps a generated distinct id across page loads", async () => {
    const first = await loadAnalytics("phc_test");
    first.Analytics.init();
    first.Analytics.postVipClaimSuccessEvent();

    const second = await loadAnalytics("phc_test");
    second.Analytics.init();
    second.Analytics.postVipClaimSuccessEvent();

    expect(sentBody(second.fetchMock).distinct_id).toBe(
      sentBody(first.fetchMock).distinct_id,
    );
  });
});
