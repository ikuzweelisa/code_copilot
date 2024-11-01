import { readStreamableValue, StreamableValue } from "ai/rsc";
import { useEffect, useState } from "react";

function useStreamText(content: string | StreamableValue<string>) {
  const [text, setText] = useState<string>(
    typeof content === "string" ? content : ""
  );
  useEffect(() => {
    (async () => {
      if (typeof content === "object") {
        let value = "";
        for await (const delta of readStreamableValue(content)) {
          if (typeof delta === "string") {
        
            setText((value = value + delta));
          }
        }
      }
    })();
  }, [content]);
  return text
}


export default useStreamText
