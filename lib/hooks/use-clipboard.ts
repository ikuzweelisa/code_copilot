import { useState } from "react";
function useClipBoard() {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  function copyText(text: string|undefined) {
    if (!text || typeof window === undefined) return;
    navigator.clipboard.writeText(text).then(() => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    });
  }

  return [isCopied, copyText] as const;
}
export { useClipBoard};
