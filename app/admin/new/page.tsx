import { requireAdmin } from "../auth";
import PostForm from "../PostForm";

interface Props {
  searchParams: Promise<{ error?: string }>;
}

export default async function NewPostPage({ searchParams }: Props) {
  await requireAdmin();
  const { error } = await searchParams;
  return <PostForm error={error} />;
}
