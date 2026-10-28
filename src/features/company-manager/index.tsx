import { createFeature } from "../../utils/feature";
import { isSettingEnabled } from "../../settings/stuff-settings";
import { getCitizen } from "../../utils/erep-global-info";
import { log } from "../../utils/utils";
import { getCompanyPage } from "./company-page";
import { getManagerWorkLimit, parseEnergy } from "./manager-work";
import {
  type CompanyType,
  ManagerTypeButtons,
  managerTypeButtonsMountOptions,
} from "./components/ManagerTypeButtons";
import "./StaticStyles.scss";

const BODY_CLASS = "su-company-manager";
const WITH_TYPES_BODY_CLASS = "su-company-manager-types";
const COMPANIES_SELECTOR =
  ".listing.companies:not(.disabled):not(.cannotWorkAsManager):not(.cannotWorkAsManager-location)";
const PICTURE_SELECTOR = ".area_pic > img";

export const CompanyManagerFeature = createFeature({
  id: "company_manager",
  name: "Company Manager",
  description:
    "Selects Work as Manager in every company of a type with a single click.",
  canExecute: (url) => url.pathname.includes("/economy/myCompanies"),
  isSettingEnabled: () => isSettingEnabled("companyManager"),
  execute: ({ mount, onCleanup }) => {
    if (!getCompanyPage()) {
      log("The My Companies page script is missing, not adding manager types");
      return;
    }
    document.body.classList.add(BODY_CLASS);
    onCleanup(() => document.body.classList.remove(BODY_CLASS));

    const companies = [...document.querySelectorAll(COMPANIES_SELECTOR)];
    const types = getCompanyTypes(companies);
    const title = document.querySelector(".area h4");
    if (types.length === 0 || !title) {
      return;
    }
    document.body.classList.add(WITH_TYPES_BODY_CLASS);
    onCleanup(() => document.body.classList.remove(WITH_TYPES_BODY_CLASS));

    mount(
      <ManagerTypeButtons
        types={types}
        onSelect={(type) => workAsManagerIn(type, companies)}
      />,
      title,
      managerTypeButtonsMountOptions,
    );
  },
});

function getCompanyTypes(companies: Element[]): CompanyType[] {
  const types = new Map<string, CompanyType>();
  for (const company of companies) {
    const picture = company.querySelector<HTMLImageElement>(PICTURE_SELECTOR);
    const imageUrl = picture?.getAttribute("src");
    if (picture && imageUrl && !types.has(imageUrl)) {
      types.set(imageUrl, { imageUrl, name: picture.title });
    }
  }
  return [...types.values()];
}

/** Selects Work as Manager in the companies of a type, as far as the energy goes. */
function workAsManagerIn(type: CompanyType, companies: Element[]) {
  const page = getCompanyPage();
  if (!page) {
    return;
  }
  // So that the page counts the food energy as available
  page.pageDetails.recoverable_health.value = page.food_remaining;

  const limit = getManagerWorkLimit(getEnergy());
  let selected = document.querySelectorAll(".owner_work.active").length;
  for (const company of companies) {
    const picture = company.querySelector(PICTURE_SELECTOR);
    if (picture?.getAttribute("src") !== type.imageUrl) {
      continue;
    }
    company.querySelectorAll(".owner_work:not(.active)").forEach((button) => {
      if (selected < limit) {
        button.classList.add("active");
        selected++;
      }
    });
  }

  companies.forEach((company) => page.calculateProduction(company, true));
  page.checkHealth();
  page.checkTax();
  page.calculateTotals();
  page.warnForCritical();
}

/** The top bar shows the current energy, the citizen data only the one at page load. */
function getEnergy(): number {
  return (
    parseEnergy(document.querySelector("#currentEnergy")?.textContent) ??
    getCitizen().energy
  );
}
