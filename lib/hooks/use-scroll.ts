import React, { useState, useRef, useCallback, useEffect } from "react";
import { useInView } from "react-intersection-observer";

function useScroll<T extends HTMLElement>() {
  const [isAtBottom, setIsAtBottom] = useState(true);
  const messagesRef = useRef<T>(null);

  const { ref: visibilityRef, inView: isVisible } = useInView({
    triggerOnce: false,
    delay: 100,
    rootMargin: "0px 0px 0px 0px",
  });
  const handleScroll = (e: React.UIEvent<T, UIEvent>) => {
    const target = e.target as T;
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
          behavior: "instant",
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
