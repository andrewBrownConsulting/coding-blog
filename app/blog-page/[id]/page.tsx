import { getDataForId } from "../../utils.js";
import { Heading, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link.js";
interface Props {
    params: { id: string }
};
function parseArticle(articleArray: string[]) {
    // turn lines starting with ## into h2 tags
    return articleArray.map((line, key) => {
        if (line.startsWith("##")) {
            return <Heading key={key}>{line.substring(3)}</Heading>;
        }
        else if (line.startsWith("![")) {
            //extract url from ![url]
            const url = line.substring(2, line.length - 1);
            return <Image key={key} src={url} alt="Blog Image" width={500} height={300} />;
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
        <div style={{ maxWidth: "100ch", justifyContent: "center" }}>
            <Heading size="lg">{title}</Heading>
            <Image src={image} alt={title} width={500} height={300} />
            <p>{date.toLocaleString()}</p>
            {parseArticle(article).map((paragraph) => paragraph)}
            <Link href="/">Back to Home</Link>
        </div>
    );
}