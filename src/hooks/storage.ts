// a hook to preserve state in a localstorage and get it at init
import { useEffect, useState } from "react";

const STORAGE_PREFIX = "STUFF_UNLOCKED.";

export const useLocalStorage = <T extends unknown>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(() => {
    const item = window.localStorage.getItem(STORAGE_PREFIX + key);
    if (item) {
      return JSON.parse(item);
    }
    return initialValue;
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
