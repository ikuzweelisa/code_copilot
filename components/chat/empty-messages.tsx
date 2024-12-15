import { exampleMessages } from "@/lib/data";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";

interface Props {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
}

export default function EmptyScreen({ setInput }: Props) {
  return (
    <div className="h-1/2  flex items-center justify-center p-4 w-full">
      <div className="h-fit flex flex-col items-center justify-center w-full max-w-xl">
        <div className="w-full grid gap-2 sm:grid-cols-1 lg:grid-cols-2">
          {exampleMessages.map(({ heading, icon: Icon }, index) => (
            <Card
              key={heading}
              onClick={() => {
                setInput("");
                setInput((currentInput) => heading);
              }}
              className={cn(
                "cursor-pointer shadow-none rounded-md border p-1.5",
                index > 1 && "hidden md:block"
              )}
            >
              <CardContent className="text-sm flex gap-3 font-semibold  p-2">
                {Icon} {heading}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
