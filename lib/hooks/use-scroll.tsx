import { useState, useRef, useCallback, useEffect } from "react";
import { useInView } from "react-intersection-observer";
function useScroll() {
  const [isAtBottom, setIsAtBottom] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);

  const { ref: visibilityRef, inView: isVisible } = useInView({
    triggerOnce: false,
    delay: 100,
    rootMargin: "0px 0px -150px 0px",
  });

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

  useEffect(() => {
    const { current } = scrollRef;
    if (current) {
      const handleScroll = (e: Event) => {
        const target = e.target as HTMLDivElement;
        const offset = 25;
        const isAtBottom =
          target.scrollTop + target.clientHeight >=
          target.scrollHeight - offset;
        setIsAtBottom(isAtBottom);
      };

      current.addEventListener("scroll", handleScroll);
      return () => {
        current.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  return {
    messagesRef,
    scrollRef,
    visibilityRef,
    scrollToBottom,
    isAtBottom,
    isVisible,
  };
}

export default useScroll;
