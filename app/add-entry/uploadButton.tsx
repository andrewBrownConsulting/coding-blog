'use client'
import { Button } from "@chakra-ui/react";
import { createPost } from './actions.js'
export default function UploadButton({ id, title, date, imageUrl, article }: { id: string, title: string, date: string, imageUrl: string, article: string }) {
  async function submitBlog() {
    const convertedDate = new Date(date);
    const splitArticle = article.split('\n');
    createPost(id, title, convertedDate, imageUrl, splitArticle);
  }
  return (
    <Button onClick={() => submitBlog()}>Upload</Button>
  )
}
