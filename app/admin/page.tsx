import type { Metadata } from "next";
import Link from "next/link";
import { Box, Button, Flex, Heading, Input, Stack, Table, Text } from "@chakra-ui/react";
import { isAdmin } from "./auth";
import { login, logout } from "./actions";
import DeleteButton from "./DeleteButton";
import { formatDate, getAllData } from "../utils.js";

export const metadata: Metadata = {
  title: "Admin | Andrew Brown Blog",
  robots: { index: false, follow: false },
};

interface Props {
  searchParams: Promise<{ error?: string; saved?: string }>;
}

export default async function AdminPage({ searchParams }: Props) {
  const { error, saved } = await searchParams;

  if (!(await isAdmin())) {
    return (
      <Box maxW="sm" mx="auto" mt={10}>
        <Heading size="2xl" mb={4} textAlign="center">Admin login</Heading>
        <form action={login}>
          <Stack gap={3}>
            <Input type="password" name="password" placeholder="Password" required autoFocus />
            {error && <Text color="red.400">Wrong password.</Text>}
            <Button type="submit">Log in</Button>
          </Stack>
        </form>
      </Box>
    );
  }

  const posts = await getAllData();
  return (
    <Box maxW="900px" mx="auto">
      <Flex justify="space-between" align="center" mb={4} gap={3} wrap="wrap">
        <Heading size="2xl">Admin</Heading>
        <Flex gap={2}>
          <Link href="/admin/new"><Button>New post</Button></Link>
          <form action={logout}><Button type="submit" variant="outline">Log out</Button></form>
        </Flex>
      </Flex>
      {saved && <Text color="green.400" mb={4}>Saved &quot;{saved}&quot;.</Text>}
      <Text color="gray.400" mb={2}>{posts.length} posts</Text>
      <Table.Root size="sm" interactive>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Title</Table.ColumnHeader>
            <Table.ColumnHeader>Date</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end">Actions</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {posts.map((post) => (
            <Table.Row key={post.id}>
              <Table.Cell>
                <Link href={`/blog-page/${post.id}`} target="_blank">{post.title}</Link>
              </Table.Cell>
              <Table.Cell whiteSpace="nowrap">{formatDate(post.date)}</Table.Cell>
              <Table.Cell>
                <Flex gap={2} justify="end">
                  <Link href={`/admin/edit/${encodeURIComponent(post.id)}`}>
                    <Button size="xs" variant="outline">Edit</Button>
                  </Link>
                  <DeleteButton id={post.id} title={post.title} />
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
}
