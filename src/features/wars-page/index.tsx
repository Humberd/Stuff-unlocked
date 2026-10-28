import {
  createFeature,
  type FeatureContext,
  runIndependently,
} from "../../utils/feature";
import { isSettingEnabled } from "../../settings/stuff-settings";
import { getCitizenId, isTopWindow } from "../../utils/erep-global-info";
import { waitForElement } from "../../utils/dom";
import { ensure } from "../../utils/utils";
import * as CitizenProfile from "../../requests/citizen-profile-personal-request";
import {
  CAMPAIGNS_LIST_SELECTOR,
  getCampaign,
  getCampaignsRequestTime,
  isOnWarsPage,
} from "./campaign-scope";
import { forEachElement } from "./observe-elements";
import { Countdown } from "./components/Countdown";
import { cardProgress, killsNeeded } from "./mercenary-progress";
import {
  cardProgressMountOptions,
  CardProgressBadges,
  ProgressSummary,
  summaryMountOptions,
} from "./components/MercenaryProgress";
import "./StaticStyles.scss";

export const WarsPageCompactLayoutFeature = createFeature({
  id: "wars_page_compact_layout",
  name: "Wars Page Compact Layout",
  description: "Fits more battles on the wars page.",
  canExecute: (url) => isOnWarsPage(url) && isTopWindow(),
  isSettingEnabled: () => isSettingEnabled("compactWarsPage"),
  execute: ({ onCleanup }) => {
    document.body.classList.add("su-compact-wars-page");
    onCleanup(() => document.body.classList.remove("su-compact-wars-page"));
  },
});

export const WarsPageCountdownFeature = createFeature({
  id: "wars_page_countdown",
  name: "Wars Page Countdown",
  description:
    "Shows the time left until a battle starts instead of 'waiting' on the wars page.",
  canExecute: (url) => isOnWarsPage(url) && isTopWindow(),
  isSettingEnabled: () => isSettingEnabled("replaceWaitingwithCountdown"),
  execute: async ({ signal, mount, onCleanup }) => {
    const list = await waitForElement(CAMPAIGNS_LIST_SELECTOR);
    forEachElement(
      list,
      ".timer",
      (timer) => {
        const start = getCampaign(timer)?.start;
        const requestTime = getCampaignsRequestTime();
        if (start === undefined || requestTime === undefined) {
          return;
        }
        const secondsLeft = start - requestTime;
        if (secondsLeft <= 0) {
          return;
        }

        const original = [...timer.childNodes];
        timer.replaceChildren();
        onCleanup(() => timer.replaceChildren(...original));
        mount(<Countdown startsAt={Date.now() + secondsLeft * 1000} />, timer, {
          position: "append",
          tagName: "span",
        });
      },
      signal,
    );
  },
});

export const WarsPageMercenaryProgressFeature = createFeature({
  id: "wars_page_mercenary_progress",
  name: "Wars Page Mercenary Progress",
  description:
    "Shows the Mercenary and Freedom Fighter kills on every battle of the wars page, and the progress of both medals.",
  canExecute: (url) => isOnWarsPage(url) && isTopWindow(),
  isSettingEnabled: () => isSettingEnabled("mercFF"),
  execute: async (context) => {
    const citizenId = getCitizenId();
    if (!citizenId) {
      return;
    }
    const profile = await CitizenProfile.sendRequest(citizenId);
    if (context.signal.aborted) {
      return;
    }
    const mercenary = ensure(
      CitizenProfile.findMercenaryProgress(profile),
      "Mercenary progress not found in the profile",
    );
    const { freedomFighter } = profile;

    await runIndependently([
      () => showCardProgress(context, mercenary, freedomFighter),
      () => showSummary(context, mercenary, freedomFighter),
    ]);
  },
});

async function showCardProgress(
  { signal, mount }: FeatureContext,
  mercenary: CitizenProfile.MercenaryProgress,
  freedomFighter: CitizenProfile.FreedomFighter,
) {
  const list = await waitForElement(CAMPAIGNS_LIST_SELECTOR);
  forEachElement(
    list,
    ".war_card",
    (card) => {
      const campaign = getCampaign(card);
      const flags = card.querySelector(".war_flags");
      const progress =
        campaign && cardProgress(campaign, mercenary, freedomFighter);
      if (!progress || !flags) {
        return;
      }
      mount(
        <CardProgressBadges
          progress={progress}
          freedomFighterKillsNeeded={freedomFighter.milestone.kills}
        />,
        flags,
        cardProgressMountOptions,
      );
    },
    signal,
  );
}

async function showSummary(
  { mount }: FeatureContext,
  mercenary: CitizenProfile.MercenaryProgress,
  freedomFighter: CitizenProfile.FreedomFighter,
) {
  const filters = await waitForElement(".filters_wrapper");
  const needed = killsNeeded(mercenary, freedomFighter);
  mount(
    <ProgressSummary
      mercenary={{
        current: mercenary.progress.current,
        max: mercenary.progress.max,
        killsNeeded: needed.mercenary,
      }}
      freedomFighter={{
        regions: freedomFighter.progress.regions,
        regionsNeeded: freedomFighter.milestone.regions,
        killsPerRegion: freedomFighter.milestone.kills,
        killsNeeded: needed.freedomFighter,
      }}
    />,
    filters,
    summaryMountOptions,
  );
}
