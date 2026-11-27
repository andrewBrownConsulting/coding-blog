'use client'
import { Button, Flex, Input, Textarea } from "@chakra-ui/react";
import { useState } from "react"
import UploadButton from "./uploadButton";
export default function AddEntryForm() {
  const [id, setId] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [article, setArticle] = useState<string>("");
  return (
    <>
      <Flex flexDir={"column"} gap={3}>
        <Input placeholder="Id" value={id} onChange={(e) => setId(e.target.value)} />
        <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Input placeholder="Date" type={"date"} value={date} onChange={(e) => setDate(e.target.value)} />
        <Input placeholder="ImageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
        <Textarea placeholder="article" value={article} onChange={(e) => setArticle(e.target.value)} autoresize />
        <UploadButton id={id} title={title} date={date} imageUrl={imageUrl} article={article} />
      </Flex>
    </>
  )
}
