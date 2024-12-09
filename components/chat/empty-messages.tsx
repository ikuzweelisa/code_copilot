import { exampleMessages } from "@/lib/data";
import { Card, CardContent, CardDescription } from "../ui/card";
import { cn } from "@/lib/utils";

interface Props {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
}

export default function EmptyScreen({ setInput, input }: Props) {
  return (
    <div className="h-1/2  flex items-center justify-center p-4 w-full">
      <div className="h-fit flex flex-col items-center justify-center w-full max-w-xl">
        <div className="w-full grid gap-2 sm:grid-cols-1 lg:grid-cols-2">
          {exampleMessages.map((example, index) => (
            <Card
            
              key={example.heading}
              onClick={() => {
                setInput("");
                setInput((currentInput) => example.message);
              }}
              className={cn(
                "cursor-pointer shadow-none rounded-md border p-1.5",
                index > 1 && "hidden md:block"
              )}
            >
              <CardContent className="text-sm font-semibold p-0">
                {example.heading}
              </CardContent>
              <CardDescription className="text-sm text-muted-foreground">
                {example.subheading}
              </CardDescription>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
