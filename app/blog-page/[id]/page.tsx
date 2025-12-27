import { getDataForId } from "../../utils.js";
import { Heading, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link.js";
interface Props {
    params: { id: string }
};
function parseArticle(articleArray: string[]) {

    //delete _ from article
    articleArray = articleArray.map(line => line.replace(/_/g, ''));
    // turn lines starting with ## into h2 tags
    return articleArray.map((line, key) => {
        if (line.startsWith("##")) {
            return <Heading key={key}>{line.substring(3)}</Heading>;
        }
        return <Text key={key}>{line}</Text>;
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