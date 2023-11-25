import { RefObject, useEffect } from "react";
import { error } from "../../../utils/utils";

/**
 * Disable map when mouse is over the panel
 * Enable map when mouse is out of the panel
 */
export function HandleMapEvents(panelRef: RefObject<HTMLDivElement>) {
  useEffect(() => {
    const disableMapCallback = () => {
      try {
        disableMap();
      } catch (e) {
        error(e);
      }
    };
    panelRef.current?.addEventListener("mouseover", disableMapCallback);
    panelRef.current?.addEventListener("touchstart", disableMapCallback);

    const enableMapCallback = () => {
      try {
        enableMap();
      } catch (e) {
        error(e);
      }
    };

    panelRef.current?.addEventListener("mouseout", enableMapCallback);
    panelRef.current?.addEventListener("touchend", enableMapCallback);

    return () => {
      panelRef.current?.removeEventListener("mouseover", disableMapCallback);
      panelRef.current?.removeEventListener("touchstart", disableMapCallback);
      panelRef.current?.removeEventListener("mouseout", enableMapCallback);
      panelRef.current?.removeEventListener("touchend", enableMapCallback);
    };
  }, [panelRef]);
}
