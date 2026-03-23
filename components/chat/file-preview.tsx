import type { FileUIPart } from "ai";
import { DownloadIcon, FullscreenIcon, MinimizeIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { cn } from "~/lib/utils";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { IconUser } from "../ui/icons";
import PDF from "../ui/pfd";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface Props {
  file: FileUIPart;
  className?: string;
  message?: string;
}
export function FilePreview({ file, message, className = "h-40 w-40 rounded-md" }: Props) {
  console.log("FilePreview", file);
  const divRef = useRef<HTMLDivElement>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  function displayPreview(className: string, open: boolean = false) {
    if (file.mediaType.startsWith("image/")) {
      return (
        <Image
          src={file.url}
          alt={file.filename ?? "file"}
          width={0}
          height={0}
          sizes="100vw"
          className={cn("h-auto w-auto", className)}
        />
      );
    }
    if (file.mediaType.startsWith("application/pdf")) {
      return <PDF file={file} open={open} className={className} />;
    }
    return (
      <Image
        className={cn(className)}
        alt="other file"
        width={500}
        height={1000}
        src={"/icons/file.png"}
      />
    );
  }

  const toogleFullScreen = () => {
    if (!document.fullscreenElement) {
      divRef.current?.requestFullscreen().then(() => {
        setIsFullScreen(true);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullScreen(false);
      });
    }
  };
  const handleDownload = async () => {
    try {
      const res = await fetch(file.url);
      if (!res.ok) {
        throw new Error("failed to get file url");
      }
      const blob = await res.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${file.filename}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.log(err);
      toast.error("failed to download");
    }
  };
  useEffect(() => {
    const handleFullScreenChange = () => {
      if (!document.fullscreenElement) {
        setIsFullScreen(false);
      } else {
        setIsFullScreen(true);
      }
    };
    document.addEventListener("fullscreenchange", handleFullScreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);
  return (
    <Dialog>
      <DialogTrigger asChild>{displayPreview(className, false)}</DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className={cn("mb-5 h-full max-w-full bg-background/50 ")}
      >
        <DialogHeader className="flex w-full  flex-row items-start justify-between px-4">
          <div className="flex items-start justify-center gap-2">
            <div className="h-10 w-10">
              <IconUser />
            </div>
            <div>
              {message && <DialogTitle className="text-sm font-medium">{message}</DialogTitle>}
              <span className="text-sm text-muted-foreground">
                {/*{formatDate(new Date(message.created_at), "HH:mm")}*/}
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <Tooltip>
              <TooltipTrigger>
                <Button variant={"outline"} onClick={toogleFullScreen}>
                  <FullscreenIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Full Screen</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <Button variant={"outline"} onClick={handleDownload}>
                  <DownloadIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Download</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <DialogClose asChild>
                  <Button variant={"outline"}>
                    <XIcon />
                  </Button>
                </DialogClose>
              </TooltipTrigger>
              <TooltipContent>Close</TooltipContent>
            </Tooltip>
          </div>
        </DialogHeader>

        <div ref={divRef} className="flex items-center justify-center">
          {displayPreview(
            `rounded-md object-contain ${isFullScreen ? "h-full w-full" : "max-h-[80vh] w-auto"}`,
            true,
          )}
          {isFullScreen && (
            <div className={"absolute top-10 right-25 flex gap-2"}>
              <Button onClick={toogleFullScreen} variant={"secondary"} title="Exit Fullscreen">
                <MinimizeIcon className="h-full w-full" />
              </Button>
              <Button variant={"secondary"} onClick={handleDownload} title="Download">
                <DownloadIcon />
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
