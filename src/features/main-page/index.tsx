import { createFeature } from "../../utils/feature";

export const MainPageFeature = createFeature({
  name: "Main Page",
  canExecute: (url) => {
    // regext that would detect a page in a pattern of: /en, /fr, /pl, etc.
    const languageRegex = /^\/[a-z]{2}$/;
    return languageRegex.test(url.pathname);
  },
  execute: async () => {
  },
});