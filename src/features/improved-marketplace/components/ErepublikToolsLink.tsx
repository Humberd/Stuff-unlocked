import type { MountOptions } from "../../../utils/render";
import styles from "./ErepublikToolsLink.module.scss";

/** Mount options for the link at the right of a page's title. */
export function erepublikToolsLinkMountOptions(
  spacing: "wide" | "narrow",
): MountOptions {
  return {
    tagName: "span",
    position: "append",
    // A single class, `mount` doesn't take more
    className: spacing === "wide" ? styles.RootWide : styles.RootNarrow,
  };
}

interface ErepublikToolsLinkProps {
  /** The page on erepublik.tools, e.g. "marketplace/jobs/0/offers". */
  path: string;
}

export const ErepublikToolsLink = ({ path }: ErepublikToolsLinkProps) => (
  <a className={styles.Link} href={`https://erepublik.tools/en/${path}`}>
    eRepublik<span className={styles.Domain}>.tools</span>
  </a>
);
