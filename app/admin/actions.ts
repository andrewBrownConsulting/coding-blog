"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { checkPassword, createSession, destroySession, requireAdmin } from "./auth";
import { addBlogEntry, deleteBlogEntry, updateBlogEntry } from "../utils.js";

export async function login(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  if (!checkPassword(password)) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    redirect("/admin?error=1");
  }
  await createSession();
  redirect("/admin");
}

export async function logout() {
  await destroySession();
  redirect("/admin");
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function savePost(formData: FormData) {
  await requireAdmin();
  const originalId = String(formData.get("originalId") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const id = slugify(String(formData.get("id") ?? "") || title);
  const date = String(formData.get("date") ?? "");
  const image = String(formData.get("image") ?? "").trim();
  const article = String(formData.get("article") ?? "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const back = originalId ? `/admin/edit/${encodeURIComponent(originalId)}` : "/admin/new";
  if (!title || !id || !date || article.length === 0) {
    redirect(`${back}?error=${encodeURIComponent("Title, date and article are required.")}`);
  }

  try {
    if (originalId) {
      await updateBlogEntry(originalId, id, title, date, image, article);
    } else {
      await addBlogEntry(id, title, date, image, article);
    }
  } catch (e) {
    const message = e instanceof Error && /duplicate key/.test(e.message)
      ? `A post with the slug "${id}" already exists.`
      : "Could not save the post.";
    redirect(`${back}?error=${encodeURIComponent(message)}`);
  }

  revalidatePath("/");
  revalidatePath(`/blog-page/${id}`);
  if (originalId && originalId !== id) revalidatePath(`/blog-page/${originalId}`);
  redirect(`/admin?saved=${encodeURIComponent(id)}`);
}

export async function deletePost(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (id) {
    await deleteBlogEntry(id);
    revalidatePath("/");
    revalidatePath(`/blog-page/${id}`);
  }
  redirect("/admin");
}
