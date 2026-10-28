import { describe, expect, it, vi } from "vitest";
import { FeatureScope, runIndependently } from "./feature";

vi.mock("./utils", async (importOriginal) => ({
  ...(await importOriginal()),
  error: vi.fn(),
}));

describe("FeatureScope", () => {
  it("runs the cleanups once, in reverse order, and aborts the signal", () => {
    const scope = new FeatureScope();
    const calls: string[] = [];
    scope.onCleanup(() => calls.push("first"));
    scope.onCleanup(() => calls.push("second"));

    scope.dispose();
    scope.dispose();

    expect(calls).toEqual(["second", "first"]);
    expect(scope.signal.aborted).toBe(true);
  });

  it("keeps cleaning up when a cleanup throws", () => {
    const scope = new FeatureScope();
    const cleanup = vi.fn();
    scope.onCleanup(cleanup);
    scope.onCleanup(() => {
      throw new Error("boom");
    });

    scope.dispose();

    expect(cleanup).toHaveBeenCalled();
  });

  it("cleans up right away what is registered after disposal", () => {
    const scope = new FeatureScope();
    scope.dispose();
    const cleanup = vi.fn();

    scope.onCleanup(cleanup);

    expect(cleanup).toHaveBeenCalled();
  });

  it("removes listeners added with its signal", () => {
    const scope = new FeatureScope();
    const target = new EventTarget();
    const listener = vi.fn();
    target.addEventListener("ping", listener, { signal: scope.signal });

    scope.dispose();
    target.dispatchEvent(new Event("ping"));

    expect(listener).not.toHaveBeenCalled();
  });

  it("removes what it mounted", () => {
    const scope = new FeatureScope();
    const anchor = document.body.appendChild(document.createElement("p"));
    const { container } = scope.mount(null, anchor);

    scope.dispose();

    expect(container.isConnected).toBe(false);
  });
});

describe("runIndependently", () => {
  it("starts every part in order before any of them settles", async () => {
    const started: number[] = [];

    await runIndependently([
      async () => {
        started.push(1);
        await Promise.resolve();
      },
      () => started.push(2),
    ]);

    expect(started).toEqual([1, 2]);
  });

  it("runs the other parts when one fails and rethrows its error", async () => {
    const other = vi.fn();

    await expect(
      runIndependently([
        () => {
          throw new Error("boom");
        },
        other,
      ]),
    ).rejects.toThrow("boom");
    expect(other).toHaveBeenCalled();
  });

  it("combines the messages when several parts fail", async () => {
    const result = runIndependently([
      () => Promise.reject(new Error("a")),
      () => Promise.reject(new Error("b")),
    ]);

    await expect(result).rejects.toBeInstanceOf(AggregateError);
    await expect(result).rejects.toThrow("a; b");
  });
});
