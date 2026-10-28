import { error } from "../../utils/utils";

/**
 * Event handlers for a panel over the travel map: the map ignores the mouse
 * while it is over the panel, so that using the panel doesn't move the map.
 */
export const mapGuardHandlers = {
  onMouseEnter: () => callMap(disableMap),
  onMouseLeave: () => callMap(enableMap),
  onTouchStart: () => callMap(disableMap),
  onTouchEnd: () => callMap(enableMap),
};

function callMap(toggle: () => void) {
  try {
    toggle();
  } catch (e) {
    error(e);
  }
}
