import React, { useEffect } from "react";

interface AutoScrollerProps {
  children: React.ReactNode;
  className?: string;
  ref: React.RefObject<HTMLDivElement|null|undefined>;
}
const AutoScroller = ({ children, className, ref }: AutoScrollerProps) => {
  useEffect(() => {
    if (!ref.current) return;
    const observer = new MutationObserver(async () => {
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
  }, [ref]);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};
AutoScroller.displayName = "AutoScroller";
export { AutoScroller };
