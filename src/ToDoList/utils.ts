import { useState } from "react";

export const STORAGE_NAME = "todoApp";
export const getId = () => Math.random().toString(36).replace("0.", "");
/**
 * inspiration from: https://usehooks.com/useLocalStorage/
 */

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);

      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(
        "There is a problem with getting items from local storage",
        error
      );
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      setStoredValue(valueToStore);

      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error("There is a problem with saving to local storage", error);
    }
  };
  return [storedValue, setValue] as const;
};