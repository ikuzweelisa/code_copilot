import React, { useEffect, forwardRef } from "react";

interface AutoScrollerProps {
  children: React.ReactNode;
  className?: string;
}

const AutoScroller = forwardRef<HTMLDivElement, AutoScrollerProps>(
  ({ children, className }, ref) => {
    useEffect(() => {
      if (!ref || typeof ref === 'function' || !ref.current) return;
      
      const observer = new MutationObserver(async () => {
        if (ref.current) {
          ref.current.scroll({
            top: ref.current.scrollHeight,
            behavior: "smooth",
          });
        }
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
  }
);

AutoScroller.displayName = "AutoScroller";
export { AutoScroller };
