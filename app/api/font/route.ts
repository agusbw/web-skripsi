import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";

const rootDirectory = path.join(process.cwd(), "public", "fonts");

export async function GET() {
  const fontPath = path.join(rootDirectory, "bookman.ttf");
  const fontBytes = fs.readFileSync(fontPath);
  const fontBuffer = Buffer.from(fontBytes);

  return new NextResponse(fontBuffer, {
    headers: new Headers({ "content-type": "application/octet-stream" }),
  });
}
