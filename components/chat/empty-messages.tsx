import { useSession } from "~/lib/auth/auth-client";
import { useAnimatedText } from "~/lib/hooks";

interface Props {
  onSubmit: (message: string) => void;
}

export default function EmptyScreen({ onSubmit: _onSubmit }: Props) {
  const session = useSession();
  const name = session.data?.user?.name?.split(" ")[0];
  const [text] = useAnimatedText(`${name ? name + " !" : ""}  How can I Assist you ?`, {
    duration: 1,
    shouldAnimate: true,
  });
  return (
    <div className="flex  h-1/2 w-full flex-col items-center justify-center gap-5 p-3">
      <span className="text-4xl sm:text-xl md:text-2xl lg:text-3xl ">{text}</span>
    </div>
  );
}
