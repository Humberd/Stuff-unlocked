import { getCookieHeaders } from "../utils/request";

export namespace InventoryJson {
  export interface Request {}

  export type Response = ItemGroup[];
  
  export function sendRequest(request: Request): Promise<Response> {
    const response = fetch(
      "https://www.erepublik.com/en/main/inventory-json",
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          ...getCookieHeaders(),
        },
      }
    );
    return response.then((response) => response.json());
  }

  export interface ItemGroup {
    id: string;
    title: string;
    items: Item[];
  }

  export interface Item {
    id?: string;
    name?: string;
    type?: string;
    rarity?: Rarity;
    quality?: number | null;
    icon?: string;
    attributes?: ItemAttributes;
    tooltip?: ItemTooltipInfo;
    description?: null | string;
    amount?: number;
    amountDisplay?: string;
    industryId?: number;
    amountForSale?: number;
    actionable?: Actionable;
    finalProduct?: FinalProduct;
    components?: Component[];
    buttonText?: string;
    canAssemble?: boolean;
    componentsPerItem?: number;
  }

  export interface Actionable {
    url: string;
    params: Params;
    maxAmount?: number;
    itemsUpdate?: boolean;
    confirmType?: "inline";
  }

  export interface Params {
    type?: string;
    quality?: number;
    duration?: number;
    amount?: number;
    itemLevel?: number;
    isAjax?: boolean;
    what?: string;
  }

  export interface ItemAttributes {
    canDonate?: boolean;
    currencyId?: number;
    currency?: boolean;
    token?: boolean;
    canBeSold?: boolean;
    food?: boolean;
    manufactured?: boolean;
    storage?: number;
    energy?: string;
    groundWeapon?: boolean;
    durability?: string;
    battleDamageGnd?: string;
    fixedDamage?: boolean;
    firepowerGnd?: string;
    ticket?: boolean;
    distance?: string;
    raw?: boolean;
    highStorage?: boolean;
    temporary?: Temporary;
    miscellaneous?: boolean;
    armory?: boolean;
    vehicle_blueprint?: boolean;
    booster?: boolean;
    duration?: string;
    battleDamageAir?: string;
    actionable?: boolean;
    battleInfluenceAir?: string;
    militaryRankAir?: string;
    battleDamage?: string;
    deploy_size?: number;
    battleInfluenceGnd?: string;
    militaryRankGnd?: string;
    prestigePoints?: number;
    speed?: string;
    overtimePoints?: string;
    active?: Active;
    inProduction?: boolean;
    component?: boolean;
    energyPool?: string;
    energyRecovery?: string;
  }

  export interface Active {
    activeTimeLeft: number;
    activeUntil: number;
    showProgress: boolean;
    progress: number;
    state: null;
  }

  export interface Temporary {
    expiresIn: number;
    expiresAt: number;
    showProgress: boolean;
    progress: string;
    state: State;
  }

  export type State = "info" | "warn" | "positive";

  export interface Component {
    id: string;
    name: string;
    type: Type;
    rarity: Rarity;
    quality: number | null;
    icon: string;
    attributes: ComponentAttributes;
    tooltip: ItemTooltipInfo | null;
    description: Description;
    amount: number;
    amountDisplay: string;
    industryId?: number;
  }

  export interface ComponentAttributes {
    miscellaneous?: boolean;
    token?: boolean;
    component: boolean;
    groundWeapon?: boolean;
    manufactured?: boolean;
    durability?: string;
    battleDamageGnd?: string;
  }

  export type Description =
    | "One of the 5 parts required to assemble Bazookas."
    | "Using Ammunition improves your damage in battles";

  export type Rarity = "common" | "uncommon" | "rare" | "epic" | "legendary";

  export interface ItemTooltipInfo {
    attributes: PurpleAttribute[];
    info: Info[] | null;
    help: null;
  }

  export interface PurpleAttribute {
    type: string;
    text: string;
    value: number | string;
  }

  export interface Info {
    type: State;
    text: string;
  }

  export type Type = "miscellaneous" | "groundWeapon";

  export interface FinalProduct {
    id: string;
    name: string;
    type: string;
    rarity: Rarity;
    quality: number;
    icon: string;
    attributes: FinalProductAttributes;
    tooltip: FinalProductTooltip;
    description: null | string;
    industryId: number;
    amount: null;
    amountDisplay: string;
  }

  export interface FinalProductAttributes {
    groundWeapon: boolean;
    durability?: string;
    fixedDamage: boolean;
    firepowerGnd: string;
  }

  export interface FinalProductTooltip {
    attributes: FluffyAttribute[];
    info: null;
    help: null;
  }

  export interface FluffyAttribute {
    type: string;
    text: string;
    value: string;
  }

}