import { createFeature, type FeatureContext } from "../../utils/feature";
import { ensure, error } from "../../utils/utils";
import { installWheelOverrides } from "./wheel-of-fortune";
import { AutoSpinPanel } from "./components/AutoSpinPanel";
import { PrizeLog } from "./components/PrizeLog";

export const PowerSpinFeature = createFeature({
  id: "power_spin",
  name: "Power Spin",
  description:
    "Adds an auto spinner and a prize log to Power Spin, and speeds up the spin animation.",
  canExecute: () => true,
  execute: ({ signal, mount }) => {
    const launchButton = document.getElementById("launch_wof");
    if (!launchButton) {
      return;
    }

    // The game sets the wheel up only when it is opened
    let isWheelSetUp = false;
    launchButton.addEventListener(
      "click",
      () => {
        if (isWheelSetUp) {
          return;
        }
        try {
          setUpWheel(mount);
          isWheelSetUp = true;
        } catch (e) {
          error(e);
        }
      },
      { signal },
    );
  },
});

function setUpWheel(mount: FeatureContext["mount"]) {
  const wheelRoot = ensure(
    document.getElementById("wheelOfFortune"),
    "Wheel of fortune not found",
  );
  installWheelOverrides();

  // Both panels are positioned relative to the wheel
  mount(
    <>
      <PrizeLog />
      <AutoSpinPanel />
    </>,
    wheelRoot,
    { position: "append" },
  );
}
