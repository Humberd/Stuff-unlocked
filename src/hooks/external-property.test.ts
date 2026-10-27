import { describe, expect, it, vi } from "vitest";
import { ExternalProperty } from "./external-property";

describe("ExternalProperty", () => {
  it("starts with the initial value", () => {
    expect(new ExternalProperty(5).get()).toBe(5);
  });

  it("notifies subscribers until they unsubscribe", () => {
    const property = new ExternalProperty(0);
    const listener = vi.fn();
    const unsubscribe = property.subscribe(listener);

    property.update(1);
    unsubscribe();
    property.update(2);

    expect(listener).toHaveBeenCalledTimes(1);
    expect(property.get()).toBe(2);
  });
});
