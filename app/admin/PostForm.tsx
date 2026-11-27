import Link from "next/link";
import { Box, Button, Field, Flex, Heading, Input, Stack, Text } from "@chakra-ui/react";
import { savePost } from "./actions";
import { ArticleField, CoverImageField } from "./ImageFields";

export interface Post {
  id: string;
  title: string;
  date: Date | string;
  image: string;
  article: string[];
}

function toDateInput(date: Date | string | undefined) {
  const d = date ? new Date(date) : new Date();
  return d.toISOString().slice(0, 10);
}

export default function PostForm({ post, error }: { post?: Post; error?: string }) {
  return (
    <Box maxW="900px" mx="auto">
      <Flex justify="space-between" align="center" mb={4}>
        <Heading size="2xl">{post ? "Edit post" : "New post"}</Heading>
        <Link href="/admin"><Button variant="outline">Back</Button></Link>
      </Flex>
      {error && <Text color="red.400" mb={4}>{error}</Text>}
      <form action={savePost}>
        <input type="hidden" name="originalId" value={post?.id ?? ""} />
        <Stack gap={4}>
          <Field.Root required>
            <Field.Label>Title</Field.Label>
            <Input name="title" defaultValue={post?.title} />
          </Field.Root>
          <Flex gap={4} direction={{ base: "column", md: "row" }}>
            <Field.Root>
              <Field.Label>Slug</Field.Label>
              <Input name="id" defaultValue={post?.id} placeholder="generated from the title" />
              <Field.HelperText>URL: /blog-page/&lt;slug&gt;</Field.HelperText>
            </Field.Root>
            <Field.Root required>
              <Field.Label>Date</Field.Label>
              <Input type="date" name="date" defaultValue={toDateInput(post?.date)} />
            </Field.Root>
          </Flex>
          <CoverImageField defaultValue={post?.image} />
          <ArticleField defaultValue={post?.article.join("\n\n")} />
          <Button type="submit" alignSelf="start">Save</Button>
        </Stack>
      </form>
    </Box>
  );
}
