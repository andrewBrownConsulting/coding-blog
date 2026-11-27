"use server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "../admin/auth";
import { addBlogEntry } from "../utils";

export async function createPost(id, title, convertedDate, imageUrl, splitArticle) {
  await requireAdmin();
  await addBlogEntry(id, title, convertedDate, imageUrl, splitArticle);
  revalidatePath("/");
}
