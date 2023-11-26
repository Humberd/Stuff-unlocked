import React from "react";
import { createRoot } from "react-dom/client";

export function renderElement(jsxElement: React.JSX.Element) {
  const div = document.createElement("div");
  const root = createRoot(div);
  root.render(jsxElement);

  return {
    before: (element: HTMLElement | null) => {
      if (!element) {
        throw Error(`Can't find element to insert before`);
      }
      element.insertAdjacentElement("beforebegin", div);
    },
    after: (element: HTMLElement | null) => {
      if (!element) {
        throw Error(`Can't find element to insert after`);
      }
      element.insertAdjacentElement("afterend", div);
    },
  };
}
