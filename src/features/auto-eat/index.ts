import { createFeature } from "../../utils/feature";
import {
  getCitizen,
  getCsrfToken,
  isTopWindow,
} from "../../utils/erep-global-info";
import { isSettingEnabled } from "../../settings/stuff-settings";
import { parseFormattedNumber } from "../../utils/format";
import { error } from "../../utils/utils";
import * as EatFood from "../../requests/eat-food-request";
import { type EnergyState, shouldEat } from "./should-eat";

const CHECK_INTERVAL_MS = 3_000;

/** Page globals of the game's energy bar. */
interface EnergyGlobals {
  food_remaining?: number;
  smallestFood?: { q?: number; use?: number };
  energy?: { processResponse?: (response: unknown) => void };
}

const game = window as unknown as EnergyGlobals;

export const AutoEatFeature = createFeature({
  id: "auto_eat",
  name: "Auto Eat",
  description:
    "Eats food every few seconds while the energy pool has room for it.",
  canExecute: () => isTopWindow(),
  isSettingEnabled: () => isSettingEnabled("energyRecovery"),
  execute: ({ onCleanup }) => {
    // Pages without the energy bar
    if (!document.querySelector("#currentEnergy") || !game.energy) {
      return;
    }

    let isEating = false;
    const eatIfUseful = () => {
      if (isEating || !shouldEat(readEnergyState())) {
        return;
      }
      isEating = true;
      eat()
        .catch((e) => error("Failed to eat food", e))
        .finally(() => {
          isEating = false;
        });
    };

    eatIfUseful();
    const intervalId = window.setInterval(eatIfUseful, CHECK_INTERVAL_MS);
    onCleanup(() => window.clearInterval(intervalId));
  },
});

function readEnergyState(): EnergyState {
  const currentEnergyText =
    document.querySelector("#currentEnergy")?.textContent;
  const hasServerData = typeof SERVER_DATA !== "undefined";
  return {
    foodRemaining: game.food_remaining,
    smallestFoodUse: game.smallestFood?.use,
    currentEnergy: currentEnergyText
      ? parseFormattedNumber(currentEnergyText)
      : undefined,
    energyPoolLimit: getCitizen()?.energyPoolLimit,
    // Without page data, deployments can't be ruled out
    isDeploying: !hasServerData || Boolean(SERVER_DATA.deployment),
    isSessionValidationPending:
      hasServerData && Boolean(SERVER_DATA.sessionValidation),
  };
}

async function eat() {
  const processResponse = game.energy?.processResponse;
  if (!processResponse) {
    return;
  }
  const response = await EatFood.sendRequest({ _token: getCsrfToken() });
  processResponse.call(game.energy, response);
}
