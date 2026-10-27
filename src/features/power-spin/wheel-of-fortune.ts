import { ExternalProperty } from "../../hooks/external-property";
import { ensure } from "../../utils/utils";
import { waitFor } from "../../utils/time";

export interface PrizeLogEntry {
  cost: number;
  name: string;
  iconUrl: string;
}

const GOLD_JACKPOT = 3;
const SPIN_COST_STEP = 100;
/** Extra time after the spin animation, so the game can process the result. */
const SAFETY_MARGIN_MS = 200;

export const jackpotCount = new ExternalProperty(0);
export const prizeLog = new ExternalProperty<PrizeLogEntry[]>([]);

let spinAnimationSeconds = 1;
export function setSpinAnimationSeconds(seconds: number) {
  spinAnimationSeconds = seconds;
}

let areOverridesInstalled = false;

/**
 * Hooks into the game's wheel of fortune:
 * - logs every prize and tracks the jackpot count,
 * - shortens the spin animation,
 * - turns off the popup listing all prizes after a multi spin.
 */
export function installWheelOverrides() {
  if (areOverridesInstalled) {
    return;
  }
  areOverridesInstalled = true;

  const wheel = erepublik.wheel_of_fortune;
  wheel.showMultiPrize = () => {};

  // The game may call `multispin` more than once with the same response
  const handledResponses = new WeakSet<WheelOfFortuneSpinResponse>();
  const originalMultispin = wheel.multispin;
  wheel.multispin = function (...args) {
    const response = args[2];
    if (!handledResponses.has(response)) {
      handledResponses.add(response);
      handleSpinResponse(response);
    }
    originalMultispin.apply(this, args);
  };

  const originalTo = TimelineMax.prototype.to;
  TimelineMax.prototype.to = function (this: unknown, target, duration, vars) {
    // The wheel spin is the only animation using this easing
    if (vars.ease === Expo.easeOut) {
      duration = spinAnimationSeconds;
    }
    return originalTo.call(this, target, duration, vars);
  };
}

function handleSpinResponse(response: WheelOfFortuneSpinResponse) {
  jackpotCount.update(response.jackpot);

  const allPrizes = window.global_wof_build_data.prizes.prizes;
  const newEntries = response.prizes.map((prize, index) => {
    const { tooltip, icon } = allPrizes[prize.index];
    return {
      cost: response.cost + SPIN_COST_STEP * index,
      name: tooltip,
      iconUrl: icon,
    };
  });
  prizeLog.update([...prizeLog.get(), ...newEntries]);
}

export type AutoSpinResult = "limit" | "jackpot" | "cancelled";

export interface AutoSpinOptions {
  /** Spinning stops once the next spin would cost this much or more. */
  maxCost: number;
  stopAtGoldJackpot: boolean;
  spinAnimationSeconds: number;
  isCancelled: () => boolean;
}

/** Spins the wheel one spin at a time until one of the stop conditions is met. */
export async function autoSpin(
  options: AutoSpinOptions,
): Promise<AutoSpinResult> {
  const spinButton = ensure(
    document.querySelector<HTMLElement>(".wof_btn.left_btn"),
    "Spin button not found",
  );

  let previousJackpotCount = jackpotCount.get();
  while (true) {
    if (options.isCancelled()) {
      return "cancelled";
    }

    const currentJackpotCount = jackpotCount.get();
    if (
      options.stopAtGoldJackpot &&
      currentJackpotCount === GOLD_JACKPOT &&
      previousJackpotCount < GOLD_JACKPOT
    ) {
      return "jackpot";
    }
    previousJackpotCount = currentJackpotCount;

    if (window.global_wof_build_data.cost >= options.maxCost) {
      return "limit";
    }

    spinButton.click();
    await waitFor(options.spinAnimationSeconds * 1000 + SAFETY_MARGIN_MS);
  }
}
