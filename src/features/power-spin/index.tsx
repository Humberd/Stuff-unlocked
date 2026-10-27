import { createFeature } from "../../utils/feature";
import { markOnce } from "../../utils/dom";
import { renderElementWithRoot } from "../../utils/render";
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
  execute: () => {
    const launchButton = document.getElementById("launch_wof");
    if (!launchButton || !markOnce(launchButton, "power-spin")) {
      return;
    }

    // The game sets the wheel up only when it is opened
    launchButton.addEventListener("click", () => {
      try {
        setUpWheel();
      } catch (e) {
        error(e);
      }
    });
  },
});

let isWheelSetUp = false;

function setUpWheel() {
  if (isWheelSetUp) {
    return;
  }
  const wheelRoot = ensure(
    document.getElementById("wheelOfFortune"),
    "Wheel of fortune not found",
  );
  installWheelOverrides();
  isWheelSetUp = true;

  // Both panels are positioned relative to the wheel
  const rootElement = document.createElement("div");
  wheelRoot.appendChild(rootElement);
  renderElementWithRoot(
    <>
      <PrizeLog />
      <AutoSpinPanel />
    </>,
    rootElement,
  );
}
