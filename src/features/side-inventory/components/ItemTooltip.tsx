import React from "react";
import { InventoryJson } from "../../../requests/inventory-json-data-request";
import Item = InventoryJson.Item;
import styles from "./ItemTooltip.module.scss";

interface ItemTooltipProps {
  tooltip: {
    show: boolean;
    position: ItemTooltipPosition;
  };
  item: Item;
  settings: {
    cookielessHost: string;
  };
}

export interface ItemTooltipPosition {
  x: number;
  y: number;
}

export const ItemTooltip: React.FC<ItemTooltipProps> = ({
  tooltip,
  settings,
  item,
}) => {
  if (!tooltip.show) return null;

  const renderAttributeIcon = (type: string): string | null => {
    switch (type) {
      case "durability":
        return `//${settings.cookielessHost}/images/icons_svg/items/shield_icon.svg`;
      case "partial":
        return `//${settings.cookielessHost}/images/icons_svg/items/round_icon.svg`;
      case "productionProgress":
        return `//${settings.cookielessHost}/images/icons_svg/items/under_production_icon.svg`;
      case "energyPool":
      case "energyPerKill":
        return `//${settings.cookielessHost}/images/icons_svg/items/energy_filled_icon.svg`;
      case "energyRecovery":
        return `//${settings.cookielessHost}/images/icons_svg/items/residence_info_icon.svg`;
      case "overtimePoints":
        return `//${settings.cookielessHost}/images/icons_svg/items/budget_icon.svg`;
      case "storage":
        return `//${settings.cookielessHost}/images/icons_svg/items/storage_icon.svg`;
      case "quantity":
        return `//${settings.cookielessHost}/images/icons_svg/items/quantity_icon.svg`;
      case "duration":
        return `//${settings.cookielessHost}/images/icons_svg/items/early_battle.svg`;
      case "firepowerGnd":
      case "firepowerAir":
      case "battleDamageAir":
      case "battleDamageGnd":
        return `//${settings.cookielessHost}/images/icons_svg/items/damage_icon.svg`;
      case "speed":
        return `//${settings.cookielessHost}/images/icons_svg/items/damage_bonuses.svg`;
      case "prestigePoints":
        return `//${settings.cookielessHost}/images/icons_svg/items/prestige_icon.svg`;
      case "energy":
        return `//${settings.cookielessHost}/images/icons_svg/items/energy_filled_icon.svg`;
      case "distance":
        return `//${settings.cookielessHost}/images/icons_svg/items/switch_icon.svg`;
      case "militaryRankAir":
      case "militaryRankGnd":
      case "battleInfluenceAir":
      case "battleInfluenceGnd":
      case "battleDamage":
        return `//${settings.cookielessHost}/images/icons_svg/items/damage_rank.svg`;
      default:
        return null;
    }
  };

  const shouldRenderAttribute = (attribute: any): boolean => {
    return (
      attribute.type !== "currencyId" &&
      attribute.type !== "damage" &&
      attribute.type.indexOf("_") === -1 &&
      attribute.type !== "boxKey"
    );
  };

  return (
    <div
      id="inventoryTooltip"
      className={styles.ItemTooltip}
      style={{ left: tooltip.position.x, top: tooltip.position.y }}
    >
      <div className={`item_plate_tooltip`}>
        <div className={`tooltip_header ${item.rarity}`}>
          <div className="item_icon">
            {item.attributes?.inProduction && (
              <img
                src={`//${settings.cookielessHost}/images/icons_svg/storage/under_production_plate_icon.svg`}
                alt=""
                className="under_production_icon"
              />
            )}
            <img src={item.icon} alt="" className="item_icon_img" />
          </div>
          <div className="item_name">{item.name}</div>
          <div className="item_rarity">{item.rarity}</div>
        </div>
        {item.tooltip?.attributes && (
          <div className="tooltip_attributes">
            {item.tooltip.attributes.map((attribute, index) => {
              if (!shouldRenderAttribute(attribute)) return null;
              const iconUrl = renderAttributeIcon(attribute.type);
              return (
                <div key={index} className="item_attribute">
                  <div className="left_part">
                    {iconUrl && <img src={iconUrl} alt="" />}
                    <span>{attribute.text}</span>
                  </div>
                  <div className="right_part">
                    <span>{attribute.value}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {item.description && (
          <div className="tooltip_description">
            <span>{item.description}</span>
          </div>
        )}
        {item.tooltip?.info && (
          <>
            {item.tooltip.info.map((info, index) => (
              <div key={index} className={`tooltip_info ${info.type}`}>
                <span>{info.text}</span>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};
