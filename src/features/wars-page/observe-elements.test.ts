import { afterEach, describe, expect, it } from "vitest";
import { forEachElement } from "./observe-elements";

afterEach(() => {
  document.body.innerHTML = "";
});

const flushMutations = () => new Promise((resolve) => setTimeout(resolve));

describe("forEachElement", () => {
  it("visits the present and the added elements once each", async () => {
    document.body.innerHTML = `<div id="root"><p class="card">1</p></div>`;
    const root = document.getElementById("root")!;
    const visited: string[] = [];
    const controller = new AbortController();

    forEachElement(
      root,
      ".card",
      (card) => visited.push(card.textContent ?? ""),
      controller.signal,
    );
    root.insertAdjacentHTML("beforeend", `<p class="card">2</p><p>3</p>`);
    await flushMutations();
    root.insertAdjacentHTML("beforeend", `<p>4</p>`);
    await flushMutations();

    expect(visited).toEqual(["1", "2"]);
  });

  it("stops once the signal is aborted", async () => {
    document.body.innerHTML = `<div id="root"></div>`;
    const root = document.getElementById("root")!;
    const visited: Element[] = [];
    const controller = new AbortController();

    forEachElement(
      root,
      ".card",
      (card) => visited.push(card),
      controller.signal,
    );
    controller.abort();
    root.insertAdjacentHTML("beforeend", `<p class="card"></p>`);
    await flushMutations();

    expect(visited).toEqual([]);
  });
});
