import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { autoSpin, AutoSpinOptions, jackpotCount } from "./wheel-of-fortune";

const SPIN_ANIMATION_SECONDS = 1;

/** Fakes the game's spin button: every click makes the next spin 100 more expensive. */
function setUpWheel(
  initialCost: number,
  onSpin: (spin: number) => void = () => {},
) {
  window.global_wof_build_data = { cost: initialCost, prizes: { prizes: {} } };
  const spinButton = document.createElement("button");
  spinButton.className = "wof_btn left_btn";
  let spins = 0;
  spinButton.addEventListener("click", () => {
    spins++;
    window.global_wof_build_data.cost += 100;
    onSpin(spins);
  });
  document.body.appendChild(spinButton);
  return { getSpins: () => spins };
}

async function runAutoSpin(options: Partial<AutoSpinOptions>) {
  const result = autoSpin({
    maxCost: 1000,
    stopAtGoldJackpot: true,
    spinAnimationSeconds: SPIN_ANIMATION_SECONDS,
    isCancelled: () => false,
    ...options,
  });
  await vi.runAllTimersAsync();
  return result;
}

describe("autoSpin", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    jackpotCount.update(0);
  });

  afterEach(() => {
    vi.useRealTimers();
    document.body.innerHTML = "";
  });

  it("spins until the next spin would cost the max money", async () => {
    const wheel = setUpWheel(500);

    await expect(runAutoSpin({ maxCost: 1000 })).resolves.toBe("limit");
    expect(wheel.getSpins()).toBe(5);
  });

  it("stops when the max money is not a multiple of 100", async () => {
    const wheel = setUpWheel(500);

    await expect(runAutoSpin({ maxCost: 1050 })).resolves.toBe("limit");
    expect(wheel.getSpins()).toBe(6);
  });

  it("does not spin when the limit is already reached", async () => {
    const wheel = setUpWheel(1000);

    await expect(runAutoSpin({ maxCost: 1000 })).resolves.toBe("limit");
    expect(wheel.getSpins()).toBe(0);
  });

  it("stops at the gold jackpot", async () => {
    const wheel = setUpWheel(500, (spin) => {
      if (spin === 2) {
        jackpotCount.update(3);
      }
    });

    await expect(runAutoSpin({ maxCost: 5000 })).resolves.toBe("jackpot");
    expect(wheel.getSpins()).toBe(2);
  });

  it("keeps spinning past the gold jackpot when asked to", async () => {
    const wheel = setUpWheel(500, (spin) => {
      if (spin === 2) {
        jackpotCount.update(3);
      }
    });

    await expect(
      runAutoSpin({ maxCost: 1000, stopAtGoldJackpot: false }),
    ).resolves.toBe("limit");
    expect(wheel.getSpins()).toBe(5);
  });

  it("stops when cancelled", async () => {
    let isCancelled = false;
    const wheel = setUpWheel(500, (spin) => {
      if (spin === 3) {
        isCancelled = true;
      }
    });

    await expect(
      runAutoSpin({ maxCost: 5000, isCancelled: () => isCancelled }),
    ).resolves.toBe("cancelled");
    expect(wheel.getSpins()).toBe(3);
  });
});
