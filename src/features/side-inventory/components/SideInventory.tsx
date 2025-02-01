import React from "react";
import styles from "./SideInventory.module.scss";
import { InventoryJson } from "../../../requests/inventory-json-data-request";
import Item = InventoryJson.Item;
import classNames from "classnames";

interface SideInventoryProps {
  items: Item[];
}

export function createSideInventoryRootElement() {
  const rootElement = document.createElement("div");
  rootElement.classList.add(styles.SideInventoryRoot);

  return rootElement;
}

export const SideInventory: React.FC<SideInventoryProps> = (props) => {
  return (
    <div className={styles.SideInventory}>
      {props.items.map((item) => {
        const isExpiringSoon = (item.attributes?.temporary?.expiresIn ?? Infinity) < 60 * 60 * 24; // 1 day
        let tooltip = `${item.attributes?.duration ? `[${item.attributes.duration}] `: ""}${item.name}`
        if (isExpiringSoon) {
          tooltip += `\nExpires in less then 1 day!!!`;
        }
        return (
          <div key={item.id} className={styles.Item} title={tooltip}>
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
  );
};
