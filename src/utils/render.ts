import React from "react";
import { createRoot } from "react-dom/client";

export function renderElement(jsxElement: React.JSX.Element) {
  const rootElement = document.createElement("div");
  return renderElementWithRoot(jsxElement, rootElement);
}

export function renderElementWithRoot(
  jsxElement: React.JSX.Element,
  rootElement: HTMLElement,
) {
  const root = createRoot(rootElement);
  root.render(jsxElement);

  return {
    before: (element: HTMLElement | null) => {
      if (!element) {
        throw Error(`Can't find element to insert before`);
      }
      element.insertAdjacentElement("beforebegin", rootElement);
    },
    after: (element: HTMLElement | null) => {
      if (!element) {
        throw Error(`Can't find element to insert after`);
      }
      element.insertAdjacentElement("afterend", rootElement);
    },
  };
}
