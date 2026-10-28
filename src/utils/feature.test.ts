import { describe, expect, it, vi } from "vitest";
import { runIndependently } from "./feature";

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
