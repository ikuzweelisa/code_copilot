import { useEffect, useState } from "react";
function useLocalStorage<T>(key: string, initialValue: T) {
  const [item, setItem] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    const item = window.localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : initialValue;
  });
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(item));
  }, [key, item]);

  return [item, setItem] as const;
}
export { useLocalStorage };
