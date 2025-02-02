import React, { MouseEventHandler, useState } from "react";
import styles from "./SideInventory.module.scss";
import { InventoryJson } from "../../../requests/inventory-json-data-request";
import Item = InventoryJson.Item;
import classNames from "classnames";
import { ItemTooltip, ItemTooltipPosition } from "./ItemTooltip";
import { getCookielessHost } from "../../../utils/erep-global-info";

interface SideInventoryProps {
  items: Item[];
}

export function createSideInventoryRootElement() {
  const rootElement = document.createElement("div");
  rootElement.classList.add(styles.SideInventoryRoot);

  return rootElement;
}

export const SideInventory: React.FC<SideInventoryProps> = (props) => {
  const [tooltipPosition, setTooltipPosition] =
    useState<ItemTooltipPosition | null>(null);
  const [tooltipItem, setTooltipItem] = useState<Item | null>(null);

  const handleMouseEnter: MouseEventHandler<HTMLDivElement> = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const { innerWidth: windowWidth, innerHeight: windowHeight } = window;

    // Initial position
    let x = rect.left + rect.width;
    let y = rect.top;

    // Tooltip dimensions
    const tooltipWidth = 200;
    const tooltipHeight = 350;

    // Adjust x if it goes beyond the viewport
    if (x + tooltipWidth > windowWidth) {
      x = windowWidth - tooltipWidth;
    }

    // Adjust y similarly
    if (y + tooltipHeight > windowHeight) {
      y = windowHeight - tooltipHeight;
    }

    // Also, make sure x and y don't go negative
    if (x < 0) {
      x = 0;
    }
    if (y < 0) {
      y = 0;
    }

    setTooltipPosition({ x, y });
  };

  function handleMouseLeave() {
    setTooltipPosition(null);
    setTooltipItem(null);
  }

  return (
    <>
      <div className={styles.SideInventory}>
        {props.items.map((item) => {
          const isExpiringSoon =
            (item.attributes?.temporary?.expiresIn ?? Infinity) < 60 * 60 * 24; // 1 day
          return (
            <div
              key={item.id}
              className={styles.Item}
              onMouseEnter={(event) => {
                handleMouseEnter(event);
                setTooltipItem(item);
              }}
              onMouseLeave={handleMouseLeave}
            >
              <img className={styles.Img} src={item.icon} alt={item.name} />
              <div
                className={classNames(styles.Text, {
                  [styles.IsActive]: item.attributes?.active,
                  [styles.IsTemporary]: item.attributes?.temporary,
                  [styles.ExpiresSoon]: isExpiringSoon,
                })}
              >
                {item.amountDisplay}
              </div>
            </div>
          );
        })}
      </div>
      {tooltipPosition && tooltipItem && (
        <ItemTooltip
          tooltip={{ show: true, position: tooltipPosition }}
          item={tooltipItem}
          settings={{
            cookielessHost: getCookielessHost(),
          }}
        />
      )}
    </>
  );
};
