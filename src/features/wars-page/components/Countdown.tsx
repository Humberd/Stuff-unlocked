import React, { useEffect, useState } from "react";
import { formatCountdown } from "../countdown";

/** Counts down to `startsAt`, a timestamp in milliseconds. */
export const Countdown: React.FC<{ startsAt: number }> = ({ startsAt }) => {
  const [now, setNow] = useState(Date.now);
  const secondsLeft = (startsAt - now) / 1000;
  const hasStarted = secondsLeft < 1;

  useEffect(() => {
    if (hasStarted) {
      return;
    }
    const intervalId = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(intervalId);
  }, [hasStarted]);

  return <>{formatCountdown(secondsLeft)}</>;
};
