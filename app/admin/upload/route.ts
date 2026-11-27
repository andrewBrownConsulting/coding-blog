import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { randomBytes } from "crypto";
import { isAdmin } from "../auth";
import { IMAGE_TYPES, MAX_UPLOAD_BYTES, UPLOAD_DIR } from "../../uploads/storage";

export async function POST(req: Request) {
  if (!(await isAdmin())) return Response.json({ error: "Not logged in." }, { status: 401 });

  const file = (await req.formData()).get("file");
  if (!(file instanceof File)) return Response.json({ error: "No file uploaded." }, { status: 400 });

  const ext = IMAGE_TYPES[file.type];
  if (!ext) return Response.json({ error: "Only PNG, JPEG, GIF, WebP, AVIF and SVG images are allowed." }, { status: 400 });
  if (file.size > MAX_UPLOAD_BYTES) return Response.json({ error: "Images must be 20 MB or smaller." }, { status: 400 });

  const base = file.name
    .replace(/\.[^.]*$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "image";
  const name = `${base}-${randomBytes(4).toString("hex")}.${ext}`;

  await mkdir(UPLOAD_DIR, { recursive: true });
  await writeFile(path.join(UPLOAD_DIR, name), Buffer.from(await file.arrayBuffer()));
  return Response.json({ url: `/uploads/${name}` });
}
