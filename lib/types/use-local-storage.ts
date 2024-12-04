import { useEffect, useState } from "react";

function UseLocalStorage<T>(
  iniatialValue: T,
  options: {
    key: string;
  }
) {
  const [value, setValue] = useState(iniatialValue);
  useEffect(() => {
    const item = window.localStorage.getItem(options.key);

    if (!item) {
      return;
    }
    setValue(JSON.parse(item));
  }, [options?.key]);

  function setItem(value: T) {
    setValue(value);
    window.localStorage.setItem(options.key, JSON.stringify(value));
  }
  return [value, setItem] as const;
}

export default UseLocalStorage;
