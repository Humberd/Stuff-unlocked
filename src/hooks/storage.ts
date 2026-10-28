// a hook to preserve state in a localstorage and get it at init
import { useEffect, useState } from "react";
import { error } from "../utils/utils";

const STORAGE_PREFIX = "STUFF_UNLOCKED.";

export const useLocalStorage = <T>(
  key: string,
  initialValue: T,
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(STORAGE_PREFIX + key);
      if (item) {
        return JSON.parse(item) as T;
      }
    } catch (e) {
      error(`Failed to read "${key}" from localStorage`, e);
    }
    return initialValue;
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
    } catch (e) {
      error(`Failed to save "${key}" to localStorage`, e);
    }
  }, [key, value]);

  return [value, setValue];
};
