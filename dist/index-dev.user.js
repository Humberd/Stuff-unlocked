// ==UserScript==
// @name     [DEV] eRepublik Stuff++ Unlocked
// @version  1.1
// @description Development mode for eRepublik Stuff++ Unlocked.
// @include https://www.erepublik.com/*
// @grant    none
// ==/UserScript==

"use strict";

function log(...args) {
  console.log("%cUserscript:", "color: purple; font-weight: bold", ...args);
}

log("Dev mode started");

async function main() {
  window.GM_info = GM_info;

  const scriptUrl = "http://localhost:8124/static/js/main.js";
  const head = document.querySelector("head");
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.charset = "UTF-8";
  script.async = true;

  let response;
  try {
    response = await fetch(scriptUrl);
  } catch (e) {
    log("ERROR loading script", e);
    return;
  }
  const text = await response.text();
  window.originalMap = getMapObjectFromIframe();
  script.text = `
        // We make sure that the Map object is the original one
        ((Map, GM_info) => {
           window.GM_info = undefined;
           ${text}
        })(window.originalMap, window.GM_info)
    `;
  head.appendChild(script);
  log("Got Dev script");
}

// Make sure we run once at the start
main
  .bind({})()
  .catch((e) => {
    log("ERROR", e);
  });

/**
 * The idiots at erep have a custom `Map` object in the global scope.
 * This is a problem because it breaks the `Map` object that is used by the
 * script.
 * Now we need to get the `Map` object from the iframe and use that instead.
 */
function getMapObjectFromIframe() {
  const iframe = document.createElement("iframe");
  iframe.style.display = "none";
  document.body.appendChild(iframe);

  const script = document.createElement("script");
  script.textContent = `
        window.getOriginalMap = function() {
            return Map;
        };
    `;
  iframe.contentDocument.body.appendChild(script);

  return iframe.contentWindow.getOriginalMap();
}
