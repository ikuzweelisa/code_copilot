import { exampleMessages } from "~/lib/data";
import { Card, CardContent } from "../ui/card";
import { cn } from "~/lib/utils";
import { generateId, Message } from "ai";
import { useAnimatedText } from "~/lib/hooks";
import { useSession } from "next-auth/react";

interface Props {
  append: (message: Message) => Promise<string | null | undefined>;
}

export default function EmptyScreen({ append }: Props) {
  const session = useSession();
  const name = session.data?.user?.name?.split(" ")[0];
  const [text] = useAnimatedText(
    `${name ? name + " !" : ""}  How can I Assist you ?`,
    {
      duration: 4,
      shouldAnimate: true,
    }
  );
  return (
    <div className="h-1/2  flex flex-col items-center gap-5 justify-center p-3 w-full">
      <span className="text-3xl sm:text-xl md:text-2xl lg:text-3xl ">
        {text}
      </span>
      <div className="h-fit flex flex-col items-center justify-center w-full max-w-xl">
        <div className="w-full grid gap-1 sm:grid-cols-1 lg:grid-cols-2">
          {exampleMessages.map(({ heading, icon: Icon }, index) => (
            <Card
              key={heading}
              onClick={async () => {
                await append({
                  id: generateId(14),
                  content: heading,
                  role: "user",
                });
              }}
              className={cn(
                "cursor-pointer shadow-none rounded-md border p-1",
                index > 1 && "hidden md:block"
              )}
            >
              <CardContent className="text-sm flex gap-3 font-medium  p-1.5">
                {Icon} {heading}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
