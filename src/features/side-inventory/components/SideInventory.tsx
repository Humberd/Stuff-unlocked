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
        const tooltip = `${item.attributes?.duration ? `[${item.attributes.duration}] `: ""}${item.name}`
        return (
          <div key={item.id} className={styles.Item} title={tooltip}>
            <img className={styles.Img} src={item.icon} alt={item.name} />
            <div
              className={classNames(styles.Text, {
                [styles.IsActive]: item.attributes?.active,
                [styles.IsTemporary]: item.attributes?.temporary,
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
