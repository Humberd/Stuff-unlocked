import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import styles from "./AutoSpinPanel.module.scss";
import { Button } from "../../../common-components/button/Button";
import { useLocalStorage } from "../../../hooks/storage";
import { error, log, toError } from "../../../utils/utils";
import {
  PowerSpinSettings,
  readLegacySettings,
  removeLegacySettings,
} from "../settings";
import {
  autoSpin,
  AutoSpinResult,
  setSpinAnimationSeconds,
} from "../wheel-of-fortune";

const MIN_MAX_MONEY_PER_SPIN = 500;

const resultMessages: Record<AutoSpinResult, string> = {
  limit: "Reached the money limit",
  jackpot: "Gold jackpot!",
  cancelled: "Cancelled",
};

interface Message {
  text: string;
  isError: boolean;
}

export const AutoSpinPanel: React.FC = () => {
  const [settings, setSettings] = useLocalStorage<PowerSpinSettings>(
    "PowerSpin.settings",
    readLegacySettings(),
  );
  // `useLocalStorage` has saved the settings under the new key by now
  useEffect(() => removeLegacySettings(), []);

  const [isSpinning, setIsSpinning] = useState(false);
  const isCancelledRef = useRef(false);
  // Without the panel nobody could cancel the spinning anymore
  useEffect(
    () => () => {
      isCancelledRef.current = true;
    },
    [],
  );
  const [message, setMessage] = useState<Message>();

  useEffect(() => {
    const seconds = Number(settings.spinAnimationSeconds);
    setSpinAnimationSeconds(seconds > 0 ? seconds : 1);
  }, [settings.spinAnimationSeconds]);

  const updateSettings = (changes: Partial<PowerSpinSettings>) =>
    setSettings((current) => ({ ...current, ...changes }));

  const onSpin = async () => {
    const maxCost = Math.floor(Number(settings.maxMoneyPerSpin));
    if (!(maxCost > MIN_MAX_MONEY_PER_SPIN)) {
      setMessage({
        text: `Max money must be more than ${MIN_MAX_MONEY_PER_SPIN}`,
        isError: true,
      });
      return;
    }
    const spinAnimationSeconds = Number(settings.spinAnimationSeconds);
    if (!(spinAnimationSeconds > 0)) {
      setMessage({
        text: "Spin animation must be more than 0s",
        isError: true,
      });
      return;
    }

    setMessage(undefined);
    isCancelledRef.current = false;
    setIsSpinning(true);
    try {
      log(`Power Spin started, max money per spin = ${maxCost}`);
      const result = await autoSpin({
        maxCost,
        stopAtGoldJackpot: settings.stopAtGoldJackpot,
        spinAnimationSeconds,
        isCancelled: () => isCancelledRef.current,
      });
      log(`Power Spin stopped: ${result}`);
      setMessage({ text: resultMessages[result], isError: false });
    } catch (e) {
      error(e);
      setMessage({ text: toError(e).message, isError: true });
    } finally {
      setIsSpinning(false);
    }
  };

  const onCancel = () => {
    isCancelledRef.current = true;
  };

  return (
    <div className={styles.Panel}>
      <label className={styles.Label}>
        Max Money Per Spin
        <input
          className={styles.Input}
          type="number"
          min={MIN_MAX_MONEY_PER_SPIN}
          step={100}
          placeholder="e.g. 2500"
          value={settings.maxMoneyPerSpin}
          disabled={isSpinning}
          onChange={(e) => updateSettings({ maxMoneyPerSpin: e.target.value })}
        />
      </label>
      <label className={classNames(styles.Label, styles.Checkbox)}>
        Stop at gold jackpot
        <input
          type="checkbox"
          checked={settings.stopAtGoldJackpot}
          disabled={isSpinning}
          onChange={(e) =>
            updateSettings({ stopAtGoldJackpot: e.target.checked })
          }
        />
      </label>
      <label className={styles.Label}>
        Spin animation
        <input
          className={styles.Input}
          type="number"
          min={0.1}
          step={0.1}
          placeholder="in seconds"
          value={settings.spinAnimationSeconds}
          onChange={(e) =>
            updateSettings({ spinAnimationSeconds: e.target.value })
          }
        />
      </label>

      <div className={styles.Buttons}>
        {isSpinning ? (
          <Button size="small" onClick={onCancel}>
            Cancel
          </Button>
        ) : (
          <Button size="small" onClick={() => void onSpin()}>
            Spin
          </Button>
        )}
      </div>
      {message && (
        <div
          className={classNames(styles.Message, {
            [styles.Error]: message.isError,
          })}
        >
          {message.text}
        </div>
      )}
    </div>
  );
};
