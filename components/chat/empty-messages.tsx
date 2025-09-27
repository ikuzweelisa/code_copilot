import { Card, CardContent } from "~/components/ui/card";
import { cn } from "~/lib/utils";
import { useAnimatedText } from "~/lib/hooks";
import { useSession } from "next-auth/react";

interface Props {
  onSubmit: (message: string) => void;
}

export default function EmptyScreen({ onSubmit }: Props) {
  const session = useSession();
  const name = session.data?.user?.name?.split(" ")[0];
  const [text] = useAnimatedText(
    `${name ? name + " !" : ""}  How can I Assist you ?`,
    {
      duration: 4,
      shouldAnimate: true,
    },
  );
  return (
    <div className="h-1/2  flex flex-col items-center gap-5 justify-center p-3 w-full">
      <span className="text-4xl sm:text-xl md:text-2xl lg:text-3xl ">
        {text}
      </span>
    </div>
  );
}
