import { Card, CardContent } from "~/components/ui/card";
import { useSession } from "~/lib/auth/auth-client";
import { useAnimatedText } from "~/lib/hooks";


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
