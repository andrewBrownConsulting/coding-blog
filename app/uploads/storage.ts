import "server-only";
import path from "path";

// Kept outside the app directory so deploys (which swap the app folder) don't wipe uploads.
export const UPLOAD_DIR = process.env.UPLOAD_DIR || path.join(process.cwd(), "..", "blog-uploads");

export const MAX_UPLOAD_BYTES = 20 * 1024 * 1024;

export const IMAGE_TYPES: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/gif": "gif",
  "image/webp": "webp",
  "image/avif": "avif",
  "image/svg+xml": "svg",
};

export const FILE_NAME = /^[a-z0-9-]+\.(png|jpg|gif|webp|avif|svg)$/;
