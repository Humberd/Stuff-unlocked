import { describe, expect, it, vi } from "vitest";
import { FeatureRunner } from "./feature-runner";
import type { Feature, FeatureContext } from "./utils/feature";

vi.mock("./utils/utils", async (importOriginal) => ({
  ...(await importOriginal()),
  log: vi.fn(),
  error: vi.fn(),
}));

const location = { href: "https://www.erepublik.com/en" } as Location;

function createFeature(overrides: Partial<Feature> = {}): Feature {
  return {
    id: "feature",
    name: "Feature",
    canExecute: () => true,
    execute: () => {},
    ...overrides,
  };
}

describe("FeatureRunner", () => {
  it("reports what ran, failed and was skipped", async () => {
    const runner = new FeatureRunner([
      createFeature({ id: "ok" }),
      createFeature({
        id: "failing",
        execute: () => Promise.reject(new Error("boom")),
      }),
      createFeature({ id: "other_page", canExecute: () => false }),
      createFeature({ id: "disabled", isSettingEnabled: () => false }),
    ]);

    const result = await runner.run(location);

    expect(result.executedWithSuccess).toBe(1);
    expect(result.statuses).toEqual({
      ok: { success: true, timeSpentMs: expect.any(Number) },
      failing: { success: false, error: "Error: boom" },
      other_page: { skipped: "Disabled on this page" },
      disabled: { skipped: "Disabled in settings" },
    });
  });

  it("cleans up the previous run before running a feature again", async () => {
    const calls: string[] = [];
    let run = 0;
    const runner = new FeatureRunner([
      createFeature({
        execute: ({ onCleanup }: FeatureContext) => {
          const current = ++run;
          calls.push(`run ${current}`);
          onCleanup(() => calls.push(`cleanup ${current}`));
        },
      }),
    ]);

    await runner.run(location);
    await runner.run(location);

    expect(calls).toEqual(["run 1", "cleanup 1", "run 2"]);
  });

  it("cleans up a feature that no longer applies to the page", async () => {
    const cleanup = vi.fn();
    let canExecute = true;
    const runner = new FeatureRunner([
      createFeature({
        canExecute: () => canExecute,
        execute: ({ onCleanup }) => onCleanup(cleanup),
      }),
    ]);

    await runner.run(location);
    canExecute = false;
    await runner.run(location);

    expect(cleanup).toHaveBeenCalledOnce();
  });
});
