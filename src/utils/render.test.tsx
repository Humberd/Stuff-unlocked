import { act } from "react";
import { beforeEach, describe, expect, it } from "vitest";
import { mount, type Mounted } from "./render";

declare global {
  var IS_REACT_ACT_ENVIRONMENT: boolean;
}
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

/** {@link mount} that finishes rendering before it returns. */
function mountNow(...args: Parameters<typeof mount>): Mounted {
  let mounted: Mounted | undefined;
  act(() => {
    mounted = mount(...args);
  });
  return mounted!;
}

function createAnchor() {
  const parent = document.createElement("section");
  const anchor = document.createElement("p");
  parent.appendChild(anchor);
  document.body.appendChild(parent);
  return anchor;
}

describe("mount", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("renders into a container after the anchor by default", () => {
    const anchor = createAnchor();

    const mounted = mountNow(<b>hi</b>, anchor);

    expect(anchor.nextElementSibling).toBe(mounted.container);
    expect(mounted.container.innerHTML).toBe("<b>hi</b>");
  });

  it.each([
    ["before", (anchor: Element) => anchor.previousElementSibling],
    ["prepend", (anchor: Element) => anchor.firstElementChild],
    ["append", (anchor: Element) => anchor.lastElementChild],
  ] as const)("inserts the container %s the anchor", (position, find) => {
    const anchor = createAnchor();

    const mounted = mountNow(null, anchor, { position });

    expect(find(anchor)).toBe(mounted.container);
  });

  it("uses the given tag and class for the container", () => {
    const mounted = mountNow(null, createAnchor(), {
      tagName: "span",
      className: "root",
    });

    expect(mounted.container.tagName).toBe("SPAN");
    expect(mounted.container.className).toBe("root");
  });

  it("renders new content and removes the container on unmount", () => {
    const mounted = mountNow(null, createAnchor());

    act(() => {
      mounted.render(<i>later</i>);
    });
    expect(mounted.container.innerHTML).toBe("<i>later</i>");

    act(() => {
      mounted.unmount();
    });
    expect(mounted.container.isConnected).toBe(false);
  });

  it("throws when the anchor is missing", () => {
    expect(() => mount(null, null)).toThrow(/Can't find/);
  });
});
