import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Props {
  isAtBottom: boolean;
  scrollToBottom: () => void;
}
function ScrollAnchor({ isAtBottom, scrollToBottom }: Props) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
        className="w-full"
      >
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <Button
            variant={"outline"}
            size={"icon"}
            className={cn(
              "z-10 border  transition-opacity duration-300 bg-background  rounded-full ",
              isAtBottom ? "opacity-0" : "opacity-100"
            )}
            onClick={scrollToBottom}
          >
            <ChevronDown className="h-3.5 w-3.5" />
            <span className="sr-only">Scroll to bottom</span>
          </Button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default ScrollAnchor;
