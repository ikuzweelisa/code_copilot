import { useEffect, useState } from "react";
import { animate, MotionValue, useMotionValue } from "motion/react";

function useAnimatedText(
  text: string,
  options: { duration?: number; shouldAnimate?: boolean } = {
    duration: 3,
    shouldAnimate: true,
  }
) {
  const [textIndex, setTextIndex] = useState<number>(() => {
    return options.shouldAnimate ? 0 : text.length;
  });
  const animatedIndex = useMotionValue(0);
  const [isAnimating, setIsAnimating] = useState(options.shouldAnimate);
  useEffect(() => {
    if (!options.shouldAnimate) {
      return;
    }
    const controls = animate(
      animatedIndex,
      text.trim().length as unknown as MotionValue<number>,
      {
        duration: options.duration,
        ease: "linear",
        onUpdate: (latest: number) => setTextIndex(Math.floor(latest)),
        onComplete: () => {
          setIsAnimating(false);
        },
      }
    );
    return () => controls.stop();
  }, [text.length, options.duration, animatedIndex]);
  return [text.split("").slice(0, textIndex).join(""),isAnimating] as const;
}

export { useAnimatedText };
