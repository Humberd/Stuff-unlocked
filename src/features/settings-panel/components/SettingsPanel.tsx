import React, { useState } from "react";
import { createPortal } from "react-dom";
import classNames from "classnames";
import styles from "./SettingsPanel.module.scss";
import {
  isSettingEnabled,
  readStuffData,
  SETTINGS,
  setSettingEnabled,
  stuffChanged,
} from "../../../settings/stuff-settings";
import { useExternalProperty } from "../../../hooks/external-property";
import { getStuffVersion } from "../../../utils/erep-global-info";
import { isNewerVersion, USERSCRIPT_URL } from "../version";
import type { MountOptions } from "../../../utils/render";

const AUTHOR_PROFILE_URL = "/en/citizen/profile/4659830";

export const settingsButtonMountOptions: MountOptions = {
  className: styles.ButtonRoot,
};

/** The sidebar button that opens the settings. */
export const SettingsButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  useExternalProperty(stuffChanged);
  const latestVersion = readStuffData().version;
  const isUpdateAvailable =
    !!latestVersion && isNewerVersion(latestVersion, getStuffVersion());

  return (
    <>
      <div
        className={classNames(styles.Button, {
          [styles.UpdateAvailable]: isUpdateAvailable,
        })}
        onClick={() => setIsOpen(true)}
      >
        {isUpdateAvailable ? "UPDATE AVAILABLE" : "Stuff++ Unlocked"}
        <span>{getStuffVersion()}</span>
      </div>
      {isOpen &&
        createPortal(
          <SettingsPanel
            isUpdateAvailable={isUpdateAvailable}
            onClose={() => setIsOpen(false)}
          />,
          document.body,
        )}
    </>
  );
};

interface SettingsPanelProps {
  isUpdateAvailable: boolean;
  onClose: () => void;
}

const sections = [...new Set(SETTINGS.map((setting) => setting.section))];

const SettingsPanel: React.FC<SettingsPanelProps> = (props) => {
  useExternalProperty(stuffChanged);
  // Half of the sections in each column
  const columns = [
    sections.slice(0, Math.ceil(sections.length / 2)),
    sections.slice(Math.ceil(sections.length / 2)),
  ];

  return (
    <>
      <div className={styles.Backdrop} onClick={props.onClose} />
      <div className={styles.Panel} role="dialog" aria-label="Stuff++ settings">
        <header className={styles.Links}>
          <a href="https://github.com/Humberd/Stuff-unlocked" target="_blank">
            Stuff++ Unlocked Website
          </a>
          <a
            href={USERSCRIPT_URL}
            className={classNames({
              [styles.UpdateAvailable]: props.isUpdateAvailable,
            })}
          >
            Update
          </a>
          <a href={AUTHOR_PROFILE_URL}>Contact / Donate</a>
          <a onClick={props.onClose}>Close</a>
        </header>
        <div className={styles.Columns}>
          {columns.map((column, index) => (
            <div key={index} className={styles.Column}>
              {column.map((section) => (
                <section key={section}>
                  <h3 className={styles.SectionTitle}>{section}</h3>
                  {SETTINGS.filter(
                    (setting) => setting.section === section,
                  ).map((setting) => (
                    <label key={setting.key} className={styles.Setting}>
                      <span>
                        {setting.label}
                        {"isAutomatic" in setting && (
                          <em
                            className={styles.Automatic}
                            title="Acts without a click. Off unless turned on."
                          >
                            auto
                          </em>
                        )}
                      </span>
                      <input
                        type="checkbox"
                        checked={isSettingEnabled(setting.key)}
                        onChange={(e) =>
                          setSettingEnabled(setting.key, e.target.checked)
                        }
                      />
                    </label>
                  ))}
                </section>
              ))}
            </div>
          ))}
        </div>
        <footer className={styles.Footer}>
          Changes apply after reloading the page.
        </footer>
      </div>
    </>
  );
};
