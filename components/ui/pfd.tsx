import type { FileUIPart } from "ai";
import Image from "next/image";

import { cn } from "~/lib/utils";

interface Props {
  open: boolean;
  className?: string;
  file: FileUIPart;
}

export default function PDF({ open, file, className }: Props) {
  return open ? (
    <iframe src={file.url} className={cn(className)} />
  ) : (
    <Image
      src={file.url}
      alt={file.filename ?? ""}
      width={200}
      height={200}
      className={cn(className)}
    />
  );
}
