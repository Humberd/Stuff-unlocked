// a hook to preserve state in a localstorage and get it at init
import { useEffect, useState } from "react";
import { error } from "../utils/utils";

const STORAGE_PREFIX = "STUFF_UNLOCKED.";

export const useLocalStorage = <T>(
  key: string,
  initialValue: T,
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(() =>
    readLocalStorage(key, initialValue),
  );

  useEffect(() => writeLocalStorage(key, value), [key, value]);

  return [value, setValue];
};

/** What {@link useLocalStorage} saved under `key`, for code outside React. */
export function readLocalStorage<T>(key: string, initialValue: T): T {
  try {
    const item = window.localStorage.getItem(STORAGE_PREFIX + key);
    if (item) {
      return JSON.parse(item) as T;
    }
  } catch (e) {
    error(`Failed to read "${key}" from localStorage`, e);
  }
  return initialValue;
}

export function writeLocalStorage<T>(key: string, value: T) {
  try {
    window.localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
  } catch (e) {
    error(`Failed to save "${key}" to localStorage`, e);
  }
}
