import { getData, getDataForId } from "../../utils.js";
interface Props {
    params: { id: string }
};
export default async function BlogCard({ params }: Props) {
    const { id: slug } = await params;

    const data = await getDataForId(slug);
    const { title, article } = data[0];
    return (
        <div>
            <h1>Blog Page for ID: {slug}</h1>
            <h2>{title}</h2>
            <p>{title.toLocaleString()}</p>
            {article.map((paragraph: string, index: number) => (
                <p key={index}>{paragraph}</p>
            )
            )}
        </div>
    );
}