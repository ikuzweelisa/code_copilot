import {
  NextJsIcon,
  PrismaIcon,
  ReactIcon,
  TypeScriptIcon,
} from "~/components/ui/icons";
import React from "react";

const exampleMessages: Array<{ heading: string; icon: React.ReactNode }> = [
  {
    heading: "What is TypeScript?",
    icon: <TypeScriptIcon size={23} />,
  },
  {
    heading: "Introduction to Prisma ORM",
    icon: <PrismaIcon size={23} />,
  },
  {
    heading: "Next.js App Router",
    icon: <NextJsIcon size={23} />,
  },
  {
    heading: "Introduce me to React js",
    icon: <ReactIcon size={23} />,
  },
];

export { exampleMessages };
