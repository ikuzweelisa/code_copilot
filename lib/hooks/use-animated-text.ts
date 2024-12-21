import { useEffect, useState } from "react";
import { animate, MotionValue, useMotionValue } from "motion/react";

function useAnimatedText(
  text: string,
  options: { duration: number } = { duration: 3 }
) {
  const [textIndex, setTextIndex] = useState<number>(0);
  const animatedIndex = useMotionValue(0);
  useEffect(() => {
    const controls = animate(animatedIndex, text.trim().length as unknown as MotionValue<number>, {
      duration: options.duration,
      ease: "linear",
      onUpdate: (latest:number) => setTextIndex(Math.floor(latest)),
    });
    return () => controls.stop();
  }, [text.length, options.duration, animatedIndex]);
  return [text.split("").slice(0, textIndex).join("")];
}

export  { useAnimatedText };
