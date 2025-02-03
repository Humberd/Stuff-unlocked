import { createFeature } from "../../utils/feature";
import { isOnHomepage } from "../../utils/erep-global-info";

export const TabTitleFeature = createFeature({
  id: "tab_title",
  name: "Tab Title",
  canExecute: () => true,
  execute: async () => {
    if (isOnHomepage()) {
      setTitleWithPrefix("Main");
      return
    }
    const pathName = window.location.pathname;
    for (const [path, title] of Object.entries(mapping)) {
      if (pathName.includes(path)) {
        if (typeof title === "function") {
          setTitleWithPrefix(title());
          break;
        }
        setTitleWithPrefix(title);
        break;
      }
    }
  }
})

const mapping = {
  "/economy/myCompanies": "Companies",
  "/economy/training-grounds": "Training Grounds",
  "/economy/inventory": "Inventory",
  "/military/campaigns": "Wars",
  "/economy/marketplace": "Marketplace",
  "/economy/job-market": "Job Market",
  "/economy/exchange-market": "Monetary Market",
  "/economy/buy-company": "Buy Companies",
  "/economy/game-tokens-market": "Game Tokens",
  "/military/battlefield": () => {
    const city = document.querySelector(".location > .locationCity")?.textContent;
    if (!city) return "Battlefield";
    return `${city} Battle`;
  },
  "/main/special-items": "Special Items",
  "/main/vip-shop": "VIP Shop",
  "/main/gold-items": "Gold Store",
  "/gold-bonus": "Gold Bonus",
  "/main/loyalty": "Loyalty Program",
  "/main/messages-inbox": "Messages",
  "/main/notifications": "Notifications",
  "/main/city": () => {
    const city = document.querySelector(".cityName")?.textContent;
    if (!city) return "City";
    return city;
  },
  "/country/society": () => {
    const country = document.querySelector("#profileholder > h1")?.textContent;
    if (!country) return "Country";
    return `${country} Society`;
  },
  "/country/economy": () => {
    const country = document.querySelector("#profileholder > h1")?.textContent;
    if (!country) return "Country";
    return `${country} Economy`;
  },
  // politics, military, administration
  "/country/politics": () => {
    const country = document.querySelector("#profileholder > h1")?.textContent;
    if (!country) return "Country";
    return `${country} Politics`;
  },
  "/country/military": () => {
    const country = document.querySelector("#profileholder > h1")?.textContent;
    if (!country) return "Country";
    return `${country} Military`;
  },
  "/country-administration": () => {
    const country = document.querySelector("#profileholder > h1")?.textContent;
    if (!country) return "Country";
    return `${country} Administration`;
  },
  "/citizen/profile": () => {
    const citizen = document.querySelector(".citizen_name")?.textContent;
    if (!citizen) return "Citizen";
    return citizen;
  },
  "/main/citizen-friends": "Friends",
  "/main/citizen-invited-friends": "Invited Friends",
  "/main/citizen-edit": "Edit Profile",
}

function setTitleWithPrefix(prefix: string) {
  document.title = `${prefix} • eRepublik`;
}