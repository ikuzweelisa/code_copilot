import {
  NextJsIcon,
  PrismaIcon,
  ReactIcon,
  NodejsIcon,
  DrizzleORM,
} from "~/components/ui/icons";
import React from "react";

const exampleMessages: Array<{ heading: string; icon: React.ReactNode }> = [
  {
    heading: "Create a basic HTTP server using Node.js",
    icon: <NodejsIcon size={23} />,
  },
  {
    heading: "Setup Drizzle ORM",
    icon: <DrizzleORM size={25} />,
  },
  {
    heading: "Implement server-side rendering with Next.js App Router?",
    icon: <NextJsIcon size={23} />,
  },
  {
    heading: "What are React hooks ?",
    icon: <ReactIcon size={23} />,
  },
];

export { exampleMessages };
