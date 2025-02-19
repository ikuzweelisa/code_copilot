import { useEffect, useRef } from "react";

function useAutoScroll<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new MutationObserver(() => {
      ref.current?.scroll({
        top: ref.current.scrollHeight,
        behavior: "smooth",
      });
    });
    observer.observe(ref.current, {
      childList: true,
      subtree: true,
    });
    return () => {
      observer.disconnect();
    };
  }, []);
  return [ref] as const;
}

export { useAutoScroll };
