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
    window.GM_info = GM_info
    const scriptUrl = "http://localhost:8124/static/js/main.js";
    const head = document.querySelector("head");
    const script = document.createElement("script");
    script.src = scriptUrl;
    head.appendChild(script);
    log("Got Dev script");
}

// Make sure we run once at the start
main.bind({})().catch((e) => {
    log("ERROR", e);
});
