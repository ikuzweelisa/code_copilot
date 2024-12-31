import { useEffect, useState } from "react";
import { animate, MotionValue, useMotionValue } from "motion/react";
interface AnimatedTextOptions {
  duration?: number;
  shouldAnimate?: boolean;
  onComplete?: () => void;
}
function useAnimatedText(text: string, options: AnimatedTextOptions) {
  const { duration = 3, shouldAnimate = true, onComplete = () => {} } = options;
  const [textIndex, setTextIndex] = useState<number>(() => {
    return options.shouldAnimate ? 0 : text.length;
  });
  const animatedIndex = useMotionValue(0);
  const [isAnimating, setIsAnimating] = useState(shouldAnimate);
  useEffect(() => {
    if (!shouldAnimate) {
      return;
    }
    const controls = animate(
      animatedIndex,
      text.trim().length as unknown as MotionValue<number>,
      {
        duration: duration,
        ease: "linear",
        onUpdate: (latest: number) => setTextIndex(Math.floor(latest)),
        onComplete: () => {
          setIsAnimating(false);
          onComplete();
        },
      }
    );
    return () => controls.stop();
  }, [text.length, options.duration, animatedIndex]);
  return [text.split("").slice(0, textIndex).join(""), isAnimating] as const;
}

export { useAnimatedText };
