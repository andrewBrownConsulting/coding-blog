import { formatDate, getDataForId } from "../../utils.js";
import { Heading, Text, Box, Image, Button } from "@chakra-ui/react";
import Link from "next/link.js";
interface Props {
  params: { id: string }
};
function parseArticle(articleArray: string[]) {
  // turn lines starting with ## into h2 tags
  return articleArray.map((line, key) => {
    if (line.startsWith("##")) {
      return <Heading my={2} key={key}>{line.substring(3)}</Heading>;
    }
    else if (line.startsWith("![")) {
      const url = line.substring(2, line.length - 1);
      return (
        <div key={key} style={{ display: "flex", justifyContent: "center" }}>
          <Image src={url} alt="Blog Image" width={500} height={300} my={2} borderRadius={'md'} />
        </div>
      );
    }
    //find _text_ and make it italic
    const parts = line.split(/(_[^_]+_)/g);
    const newline = parts.map((part, index) => {
      if (part.startsWith("_") && part.endsWith("_")) {
        return <em key={index}>{part.substring(1, part.length - 1)}</em>;
      } else {
        return part;
      }
    });
    return <Text key={key}>{newline}</Text>;
  });
}
export default async function BlogCard({ params }: Props) {
  const { id: slug } = await params;

  const data = await getDataForId(slug);
  const { title, article, date, image } = data[0];
  return (
    <Box style={{ maxWidth: "75ch", justifyContent: "center", margin: "auto", padding: "20px" }}>
      <Heading size="3xl" style={{ textAlign: "center" }}>{title}</Heading>
      <Heading style={{ textAlign: 'center', fontStyle: 'italic' }}>{formatDate(date)}</Heading>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Image src={image} alt={title} width={500} height={300} borderRadius="md" my={2} />
      </div>
      {parseArticle(article).map((paragraph) => paragraph)}
      <Box display="flex" justifyContent="center" margin='auto' py={4}>
        <Link href="/" >
          <Button>
            <Heading size="lg">Back to Home</Heading>
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
