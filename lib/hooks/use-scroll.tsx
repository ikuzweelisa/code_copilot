import React, { useState, useRef, useCallback, useEffect } from "react";
import { useInView } from "react-intersection-observer";

function useScroll() {
  const [isAtBottom, setIsAtBottom] = useState(true);
  const messagesRef = useRef<HTMLDivElement>(null);

  const { ref: visibilityRef, inView: isVisible } = useInView({
    triggerOnce: false,
    delay: 100,
    rootMargin: "0px 0px 0px 0px",
  });
  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const target = e.target as HTMLDivElement;
    const offset = 25;
    const isAtBottom =
      target.scrollTop + target.clientHeight >= target.scrollHeight - offset;
    setIsAtBottom(isAtBottom);
  };
  const scrollToBottom = useCallback(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, []);
  useEffect(() => {
    if (messagesRef.current) {
      if (isAtBottom && !isVisible) {
        messagesRef.current.scrollIntoView({
          block: "end",
          behavior: "smooth",
        });
      }
    }
  }, [isAtBottom, isVisible]);

  return {
    messagesRef,
    visibilityRef,
    scrollToBottom,
    isAtBottom,
    handleScroll,
  };
}

export { useScroll };
