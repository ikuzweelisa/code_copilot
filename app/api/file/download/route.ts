import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { getFileType } from "~/lib/server/helpers";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const url = searchParams.get("url");
  if (!url) {
    return NextResponse.json(
      { message: "file url is required" },
      { status: 404 }
    );
  }
  const res = await fetch(url);

  if (!res.ok) {
    return NextResponse.json({ message: "File not found" }, { status: 404 });
  }

  const fileBuffer = Buffer.from(await res.arrayBuffer());
  const fileType = await getFileType(fileBuffer);
  const fileSize = fileBuffer.byteLength;
  if (!fileType) {
    return NextResponse.json({ message: "Invalid file type" }, { status: 400 });
  }
  return new NextResponse(fileBuffer, {
    headers: {
      "Content-Disposition": `attachment; filename="attachment.${fileType.ext}"`,
      "Content-Type": fileType.mime,
      "Content-Length": fileSize.toString(),
    },
    status: 200,
  });
}
