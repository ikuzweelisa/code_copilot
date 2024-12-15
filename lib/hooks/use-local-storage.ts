import { useEffect, useState } from "react";

function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    const item = window.localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : initialValue;
  });

  useEffect(() => {
    const item = window.localStorage.getItem(key);
    if (item) {
      setValue(JSON.parse(item) as T);
    }
    return;
  }, [key]);

  function setItem(newValue: T) {
    setValue(newValue);
    window.localStorage.setItem(key, JSON.stringify(newValue));
  }

  return [value, setItem] as const;
}

export { useLocalStorage };