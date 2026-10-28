import React, { useEffect } from "react";
import { Button } from "../../../common-components/button/Button";
import {
  type Change,
  type ChangeKind,
  isUserFacing,
  type Release,
} from "../changelog";
import styles from "./WhatsNewDialog.module.scss";

const REPOSITORY_URL = "https://github.com/Humberd/Stuff-unlocked";
const CHANGELOG_URL = `${REPOSITORY_URL}/blob/master/CHANGELOG.md`;

const KIND_LABELS: Record<ChangeKind, string> = {
  feat: "New",
  fix: "Fix",
  other: "Change",
  misc: "Internal",
};

interface WhatsNewDialogProps {
  title: string;
  subtitle?: string;
  releases: Release[];
  onClose: () => void;
}

export const WhatsNewDialog: React.FC<WhatsNewDialogProps> = (props) => {
  const { onClose } = props;

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div className={styles.Backdrop} onClick={onClose}>
      <div
        className={styles.Dialog}
        role="dialog"
        aria-modal="true"
        aria-label={props.title}
        onClick={(event) => event.stopPropagation()}
      >
        <header className={styles.Header}>
          <h2>{props.title}</h2>
          {props.subtitle && <p>{props.subtitle}</p>}
        </header>
        <div className={styles.Releases}>
          {props.releases.map((release) => (
            <ReleaseNotes key={release.version} release={release} />
          ))}
        </div>
        <footer className={styles.Footer}>
          <a href={CHANGELOG_URL} target="_blank" rel="noreferrer">
            Full changelog on GitHub
          </a>
          <Button onClick={onClose}>Got it</Button>
        </footer>
      </div>
    </div>
  );
};

const ReleaseNotes: React.FC<{ release: Release }> = ({ release }) => {
  const visible = release.changes.filter(isUserFacing);
  const internal = release.changes.filter((change) => !isUserFacing(change));

  return (
    <section className={styles.Release}>
      <h3>
        {release.version}
        {release.date && <span>{release.date}</span>}
      </h3>
      {visible.length > 0 && <ChangeList changes={visible} />}
      {internal.length > 0 && (
        <details className={styles.Internal}>
          <summary>
            {internal.length} under-the-hood change
            {internal.length === 1 ? "" : "s"}
          </summary>
          <ChangeList changes={internal} />
        </details>
      )}
    </section>
  );
};

const ChangeList: React.FC<{ changes: Change[] }> = ({ changes }) => (
  <ul>
    {changes.map((change, index) => (
      <li key={index}>
        <span className={styles.Kind} data-kind={change.kind}>
          {KIND_LABELS[change.kind]}
        </span>
        <ChangeText text={change.text} />
      </li>
    ))}
  </ul>
);

const ChangeText: React.FC<{ text: string }> = ({ text }) => (
  <span>
    {text.split(/(#\d+)/).map((part, index) =>
      /^#\d+$/.test(part) ? (
        <a
          key={index}
          href={`${REPOSITORY_URL}/issues/${part.slice(1)}`}
          target="_blank"
          rel="noreferrer"
        >
          {part}
        </a>
      ) : (
        part
      ),
    )}
  </span>
);
