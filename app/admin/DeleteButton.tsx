"use client";
import { Button } from "@chakra-ui/react";
import { deletePost } from "./actions";

export default function DeleteButton({ id, title }: { id: string; title: string }) {
  return (
    <form
      action={deletePost}
      onSubmit={(e) => {
        if (!confirm(`Delete "${title}"? This cannot be undone.`)) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <Button type="submit" size="xs" colorPalette="red" variant="outline">Delete</Button>
    </form>
  );
}
