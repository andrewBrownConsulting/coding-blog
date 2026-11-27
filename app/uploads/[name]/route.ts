import { readFile } from "fs/promises";
import path from "path";
import { FILE_NAME, IMAGE_TYPES, UPLOAD_DIR } from "../storage";

export async function GET(_req: Request, { params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  if (!FILE_NAME.test(name)) return new Response("Not found", { status: 404 });

  const ext = name.split(".").pop();
  const type = Object.keys(IMAGE_TYPES).find((t) => IMAGE_TYPES[t] === ext)!;
  try {
    const file = await readFile(path.join(UPLOAD_DIR, name));
    return new Response(file, {
      headers: {
        "Content-Type": type,
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
        "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'; sandbox",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
