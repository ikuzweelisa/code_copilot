"use client";
import { Attachment } from "ai";
import { FileIcon, Download, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardFooter } from "~/components/ui/card";

export default function ViewAttachment({
  attachment,
}: {
  attachment: Attachment;
}) {
  const isImage = attachment.contentType?.startsWith("image/");

  return (
    <Card className="w-full max-w-xs rounded-md h-fit transition-all duration-300 ease-in-out hover:shadow-lg">
      <CardContent className="p-1">
        {isImage ? (
          <div className="relative aspect-square overflow-hidden rounded-sm">
            <Image
              src={attachment.url}
              alt={attachment.name || "Image attachment"}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 ease-in-out hover:scale-105"
            />
          </div>
        ) : (
          <div className="flex items-center justify-center aspect-square rounded-md">
            <FileIcon className="h-20 w-20 text-blue-500" />
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between items-center p-1 bg-muted/50">
        <div className="truncate mr-2">
          <p className="font-medium text-sm">{attachment.name}</p>
          <p className="text-xs text-gray-500">
            {isImage ? "Image" : attachment.contentType}
          </p>
        </div>
        <div
          className={`flex gap-2 transition-opacity duration-3 group-hover:opacity-100  opacity-0`}
        >
          <Button size="sm" variant="outline" asChild>
            <Link
              target="_blank"
              href={attachment.url}
              className="flex gap-1 items-center"
            >
              <Eye className="h-4 w-4 mr-1" />
              View
            </Link>
          </Button>
          <Button
            onClick={() => {
              fetch(`/api/download/${attachment.url}`).then((res) =>
                res.json()
              );
            }}
            size="sm"
            variant="outline"
          >
            <Download className="h-4 w-4 mr-1" />
            Download
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
