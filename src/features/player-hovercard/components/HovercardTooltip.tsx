import { Component, type ReactNode, useLayoutEffect, useRef } from "react";
import styles from "./HovercardTooltip.module.scss";
import {
  type ExternalProperty,
  useExternalProperty,
} from "../../../hooks/external-property";
import { computeTooltipPosition } from "../tooltip-position";
import type { HovercardData } from "../hovercard-data";
import { HovercardContent } from "./HovercardContent";
import { error } from "../../../utils/utils";

export type HoveredPlayer = {
  anchor: Element;
  playerId: string;
} & (
  | { status: "loading" | "failed" }
  | { status: "loaded"; data: HovercardData }
);

interface HovercardTooltipProps {
  hoveredPlayer: ExternalProperty<HoveredPlayer | null>;
  contributors: number[];
  donatorBorderUrls: Map<string, string>;
}

export function HovercardTooltip({
  hoveredPlayer,
  contributors,
  donatorBorderUrls,
}: HovercardTooltipProps) {
  const hovered = useExternalProperty(hoveredPlayer);
  const ref = useRef<HTMLDivElement>(null);

  // Positioned outside React, because the size is only known once rendered
  useLayoutEffect(() => {
    const tooltip = ref.current;
    if (!hovered || !tooltip) {
      return;
    }
    const { left, top } = computeTooltipPosition(
      hovered.anchor.getBoundingClientRect(),
      { width: tooltip.offsetWidth, height: tooltip.offsetHeight },
      { width: window.innerWidth, height: window.innerHeight },
    );
    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${top}px`;
    tooltip.style.visibility = "visible";
  }, [hovered]);

  if (!hovered) {
    return null;
  }

  return (
    <div ref={ref} className={styles.Tooltip}>
      {hovered.status === "loaded" ? (
        <ContentErrorBoundary key={hovered.playerId}>
          <HovercardContent
            playerId={hovered.playerId}
            data={hovered.data}
            isContributor={contributors.includes(Number(hovered.playerId))}
            donatorBorderUrl={donatorBorderUrls.get(hovered.playerId)}
          />
        </ContentErrorBoundary>
      ) : (
        <Message
          text={
            hovered.status === "loading"
              ? "Loading data..."
              : "Failed to load data"
          }
        />
      )}
    </div>
  );
}

function Message({ text }: { text: string }) {
  return <div className={styles.Message}>{text}</div>;
}

/** Keeps the tooltip working for other players when a profile has data it can't show. */
class ContentErrorBoundary extends Component<
  { children: ReactNode },
  { hasFailed: boolean }
> {
  state = { hasFailed: false };

  static getDerivedStateFromError() {
    return { hasFailed: true };
  }

  componentDidCatch(e: unknown) {
    error("Failed to show the player hovercard", e);
  }

  render() {
    return this.state.hasFailed ? (
      <Message text="Failed to show data" />
    ) : (
      this.props.children
    );
  }
}
