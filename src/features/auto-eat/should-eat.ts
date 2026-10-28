export interface EnergyState {
  /** Energy the food left today can still recover, `food_remaining`. */
  foodRemaining?: number;
  /** Energy recovered by eating once, `smallestFood.use`. */
  smallestFoodUse?: number;
  currentEnergy?: number;
  energyPoolLimit?: number;
  /** Eating could break a running deployment. */
  isDeploying: boolean;
  /** The game asks the player to prove they are not a bot. */
  isSessionValidationPending: boolean;
}

/** Eats only when nothing recovered would be wasted. Never guesses missing values. */
export function shouldEat(state: EnergyState): boolean {
  const { foodRemaining, smallestFoodUse, currentEnergy, energyPoolLimit } =
    state;
  if (
    !isKnown(foodRemaining) ||
    !isKnown(smallestFoodUse) ||
    !isKnown(currentEnergy) ||
    !isKnown(energyPoolLimit)
  ) {
    return false;
  }
  if (state.isDeploying || state.isSessionValidationPending) {
    return false;
  }
  if (smallestFoodUse <= 0) {
    return false;
  }
  return (
    foodRemaining >= smallestFoodUse &&
    currentEnergy + smallestFoodUse <= energyPoolLimit
  );
}

function isKnown(value: number | undefined): value is number {
  return value !== undefined && Number.isFinite(value);
}
