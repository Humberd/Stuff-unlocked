// shx mkdir -p ./dist && shx cp src/userscript-header.js ./dist/index.user.js && shx cat build/static/js/main.js >> ./dist/index.user.js

// 1. Create dist folder if it doesn't exist
// 2. Create a text buffer with the userscript header
// 3. Append old-index.user.js to the text buffer
// 4. Append the main.js to the text buffer
// 5. Write the text buffer to the index.user.js file
// 6. Copy the index.user.js file to the dist folder

const fs = require("fs");
const path = require("path");
const shx = require("shelljs");

async function main() {
  const header = fs.readFileSync(
    path.resolve(__dirname, "../src/userscript-header.js"),
    "utf8"
  );
  const main = fs.readFileSync(
    path.resolve(__dirname, "../build/static/js/main.js"),
    "utf8"
  );
  // language=JavaScript
  const mainWrappedScript = `
        ${assignWindowOriginalMap()}
        // We make sure that the Map object is the original one
        ((Map) => {
           ${main}
        })(window.originalMap)
  `.trim();
  const buffer = header + mainWrappedScript;
  shx.mkdir("-p", "../dist");
  fs.writeFileSync(path.resolve(__dirname, "../dist/index.user.js"), buffer);
  fs.writeFileSync(path.resolve(__dirname, "../src/index.user.js"), buffer);
}

main();


/**
 * The idiots at erep have a custom `Map` object in the global scope.
 * This is a problem because it breaks the `Map` object that is used by the
 * script.
 * Now we need to get the `Map` object from the iframe and use that instead.
 */
function assignWindowOriginalMap() {
  // language=JavaScript
  return `
    function getMapObjectFromIframe() {
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      document.body.appendChild(iframe);

      const script = document.createElement("script");
      script.textContent = \`
        window.getOriginalMap = function() {
          return Map;
        };
      \`;
      iframe.contentDocument.body.appendChild(script);

      return iframe.contentWindow.getOriginalMap();
    }
    window.originalMap = getMapObjectFromIframe();
  `.trim();
}
