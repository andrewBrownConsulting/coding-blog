import { notFound } from "next/navigation";
import { requireAdmin } from "../../auth";
import PostForm, { type Post } from "../../PostForm";
import { getDataForId } from "../../../utils.js";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}

export default async function EditPostPage({ params, searchParams }: Props) {
  await requireAdmin();
  const { id } = await params;
  const { error } = await searchParams;
  const [post] = await getDataForId(decodeURIComponent(id));
  if (!post) notFound();
  return <PostForm post={post as Post} error={error} />;
}
