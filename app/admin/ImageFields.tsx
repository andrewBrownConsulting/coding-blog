"use client";
import { useRef, useState } from "react";
import { Box, Button, Field, Flex, Image, Input, Text, Textarea } from "@chakra-ui/react";

async function uploadImage(file: File): Promise<string> {
  const body = new FormData();
  body.append("file", file);
  const res = await fetch("/admin/upload", { method: "POST", body });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.url) throw new Error(data.error || "Upload failed.");
  return data.url;
}

function useUploader() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function upload(files: FileList | null, onUploaded: (urls: string[]) => void) {
    if (!files || files.length === 0) return;
    setUploading(true);
    setError("");
    try {
      onUploaded(await Promise.all(Array.from(files).map(uploadImage)));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }
  return { inputRef, uploading, error, upload };
}

export function CoverImageField({ defaultValue }: { defaultValue?: string }) {
  const [url, setUrl] = useState(defaultValue ?? "");
  const { inputRef, uploading, error, upload } = useUploader();

  return (
    <Field.Root>
      <Field.Label>Cover image</Field.Label>
      <Flex gap={2} width="100%">
        <Input name="image" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Upload an image or paste a URL" />
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => upload(e.target.files, ([first]) => setUrl(first))}
        />
        <Button type="button" variant="outline" loading={uploading} onClick={() => inputRef.current?.click()}>
          Upload
        </Button>
      </Flex>
      {error && <Text color="red.400" fontSize="sm">{error}</Text>}
      {url && (
        <Box mt={2}>
          <Image src={url} alt="Cover preview" maxH="200px" borderRadius="md" />
        </Box>
      )}
    </Field.Root>
  );
}

export function ArticleField({ defaultValue }: { defaultValue?: string }) {
  const [text, setText] = useState(defaultValue ?? "");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { inputRef, uploading, error, upload } = useUploader();

  function insertImages(urls: string[]) {
    const el = textareaRef.current;
    const pos = el ? el.selectionStart : text.length;
    const before = text.slice(0, pos);
    const after = text.slice(pos);
    const block = urls.map((u) => `![${u}]`).join("\n\n");
    const prefix = before && !before.endsWith("\n") ? "\n\n" : "";
    const suffix = after && !after.startsWith("\n") ? "\n\n" : "";
    setText(before + prefix + block + suffix + after);
  }

  async function onPaste(e: React.ClipboardEvent<HTMLTextAreaElement>) {
    if (e.clipboardData.files.length > 0) {
      e.preventDefault();
      await upload(e.clipboardData.files, insertImages);
    }
  }

  async function onDrop(e: React.DragEvent<HTMLTextAreaElement>) {
    if (e.dataTransfer.files.length > 0) {
      e.preventDefault();
      await upload(e.dataTransfer.files, insertImages);
    }
  }

  return (
    <Field.Root required>
      <Flex justify="space-between" align="center" width="100%">
        <Field.Label>Article</Field.Label>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={(e) => upload(e.target.files, insertImages)}
        />
        <Button type="button" size="xs" variant="outline" loading={uploading} onClick={() => inputRef.current?.click()}>
          Insert image
        </Button>
      </Flex>
      <Textarea
        ref={textareaRef}
        name="article"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onPaste={onPaste}
        onDrop={onDrop}
        rows={24}
        fontFamily="mono"
      />
      {error && <Text color="red.400" fontSize="sm">{error}</Text>}
      <Field.HelperText>
        One paragraph per line. &quot;## Heading&quot; for headings, &quot;![url]&quot; for images, _text_ for italics.
        Drop or paste images into the box to upload them where the cursor is.
      </Field.HelperText>
    </Field.Root>
  );
}
