

export async function GET(
  request: Request,
  { params }: { params: Promise<{ file: string }> }
) {
  const { file } = await params;

  return new Response(null, {
    headers: {
      "Content-Disposition": `attachment; filename="${file}"`,
      "Content-Type": "application/octet-stream",
    },
    status:200
  });
}
