"use client";

import { FileIcon, Download, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardFooter } from "~/components/ui/card";
import { Attachment } from "~/lib/types";

export default function ViewAttachment({
  attachment,
}: {
  attachment: Attachment;
}) {
  const isImage = attachment.contentType?.startsWith("image/");

  return (
    <Card className=" rounded-md h-fit transition-all duration-300 ease-in-out hover:shadow-lg">
      <CardContent className="p-1">
        {isImage ? (
          <div className="rounded-sm">
            <Image
              src={attachment.url}
              alt={attachment.name || "Image attachment"}
              width={150}
              height={80}
              className="object-cover transition-transform duration-300 ease-in-out hover:scale-105"
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
      </CardFooter>
    </Card>
  );
}
