"use client";

import { useState } from "react";

function useClipBoard(): [boolean, (text: string|undefined) => void] {
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

  return [isCopied, copyText];
}

export default useClipBoard;
