import { describe, expect, it, vi } from "vitest";
import { retry, retryNullish } from "./time";

vi.mock("./utils", () => ({ log: vi.fn() }));

describe("retry", () => {
  it("returns once the callback stops throwing", async () => {
    let calls = 0;
    const result = await retry(
      () => {
        calls++;
        if (calls < 3) throw new Error("not yet");
        return "done";
      },
      3,
      0,
    );

    expect(result).toBe("done");
    expect(calls).toBe(3);
  });

  it("rethrows the last error after the retries run out", async () => {
    const callback = vi.fn(() => {
      throw new Error("always");
    });

    await expect(retry(callback, 2, 0)).rejects.toThrow("always");
    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe("retryNullish", () => {
  it("returns the first non-nullish value", async () => {
    const values = [null, undefined, "found"];

    await expect(retryNullish(() => values.shift(), "msg", 3, 0)).resolves.toBe(
      "found",
    );
  });

  it("throws with the message after the retries run out", async () => {
    await expect(retryNullish(() => null, "Element", 1, 0)).rejects.toThrow(
      "Retries exceeded Element",
    );
  });
});
