import { useSyncExternalStore } from "react";

/**
 * A value that lives outside React and can be read by components
 * with {@link useExternalProperty}.
 */
export class ExternalProperty<T> {
  private value: T;
  private listeners = new Set<() => void>();

  constructor(initialValue: T) {
    this.value = initialValue;
  }

  get = (): T => this.value;

  update(newValue: T) {
    this.value = newValue;
    this.listeners.forEach((listener) => listener());
  }

  subscribe = (listener: () => void): (() => void) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };
}

export function useExternalProperty<T>(property: ExternalProperty<T>): T {
  return useSyncExternalStore(property.subscribe, property.get);
}
