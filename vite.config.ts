import fs from "node:fs";
import path from "node:path";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import monkey from "vite-plugin-monkey";
import pkg from "./package.json" with { type: "json" };

const USERSCRIPT_FILE_NAME = "index.user.js";
const USERSCRIPT_RAW_URL = `https://raw.githubusercontent.com/Humberd/Stuff-unlocked/master/src/${USERSCRIPT_FILE_NAME}`;

export default defineConfig({
  server: {
    port: 8124,
    strictPort: true,
  },
  build: {
    target: "es2022",
    outDir: "dist",
    // The userscript is distributed unminified, like it always was.
    minify: false,
  },
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
  },
  plugins: [
    react(),
    monkey({
      entry: "src/index.tsx",
      userscript: {
        name: "eRepublik Stuff++ Unlocked",
        description:
          "An unlocked version of stuff++ (https://docs.google.com/spreadsheets/d/1nal62cgC7lUmrur6NRzlPVU3uxtE59WGV9-bZcPoIw8/edit#gid=0), that for some reason didn't want to run after Zordacz ban.",
        author: "Zordacz, Humberd",
        match: ["https://www.erepublik.com/*"],
        updateURL: USERSCRIPT_RAW_URL,
        downloadURL: USERSCRIPT_RAW_URL,
        "run-at": "document-start",
        // Any other grant makes Tampermonkey sandbox the script, which hides
        // the page globals (erepublik, SERVER_DATA, angular) we depend on.
        grant: "none",
      },
      build: {
        fileName: USERSCRIPT_FILE_NAME,
        autoGrant: false,
      },
      server: {
        open: false,
        prefix: (name) => `[DEV] ${name}`,
      },
    }),
    originalMapPlugin(),
    copyUserscriptToSrcPlugin(),
  ],
});

/**
 * The idiots at erep have a custom `Map` object in the global scope.
 * This is a problem because it breaks the `Map` object that is used by the
 * script. Now we need to get the `Map` object from an iframe and make sure
 * all the bundled code sees that one instead.
 */
function originalMapPlugin(): Plugin {
  const getMapFromIframe = `
    function getMapObjectFromIframe() {
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      (document.head || document.documentElement).appendChild(iframe);
      return iframe.contentWindow.Map;
    }`;

  let isServe = false;

  return {
    name: "stuff-unlocked:original-map",
    enforce: "post",
    configResolved(config) {
      isServe = config.command === "serve";
    },
    // In dev every module is loaded separately into the page, so each one
    // gets its own module-scoped `Map` that shadows the global one.
    transform: {
      order: "post",
      handler(code, id) {
        if (!isServe) {
          return;
        }
        const isScript =
          /\.[cm]?[jt]sx?(\?|$)/.test(id) ||
          id.includes("/.vite/deps/") ||
          id.includes("@react-refresh");
        if (!isScript) {
          return;
        }
        return {
          code: `const Map = (globalThis.__STUFF_UNLOCKED_MAP__ ??= (() => {${getMapFromIframe}
            return getMapObjectFromIframe();
          })());\n${code}`,
          map: null,
        };
      },
    },
    // In the build the whole bundle is wrapped in a function whose `Map`
    // parameter shadows the global one.
    generateBundle: {
      order: "post",
      handler(_, bundle) {
        const output = bundle[USERSCRIPT_FILE_NAME];
        if (!output || output.type !== "chunk") {
          this.error(`${USERSCRIPT_FILE_NAME} not found in the bundle`);
        }
        const headerEnd = "// ==/UserScript==\n";
        const headerEndIndex =
          output.code.indexOf(headerEnd) + headerEnd.length;
        const header = output.code.slice(0, headerEndIndex);
        const main = output.code.slice(headerEndIndex);

        output.code = `${header}
if (document.head) {
  execute();
} else {
  // work-around for https://github.com/greasemonkey/greasemonkey/issues/2996
  var obs = new MutationObserver(function () {
    if (document.head) { obs.disconnect(); execute(); }
  });
  obs.observe(document, {childList: true, subtree: true});
}
function execute() {${getMapFromIframe}
  // We make sure that the Map object is the original one
  ((Map) => {
${main}
  })(getMapObjectFromIframe());
}
`;
      },
    },
  };
}

/**
 * Existing installations update from `src/index.user.js` on master,
 * so the bundle has to be published there as well.
 */
function copyUserscriptToSrcPlugin(): Plugin {
  return {
    name: "stuff-unlocked:copy-userscript-to-src",
    apply: "build",
    writeBundle(options) {
      fs.copyFileSync(
        path.join(options.dir!, USERSCRIPT_FILE_NAME),
        path.resolve(import.meta.dirname, "src", USERSCRIPT_FILE_NAME),
      );
    },
  };
}
