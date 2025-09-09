import Link from "next/link";
import Image from "next/image";
export default function BlogCard({ entry }) {
    console.log(entry);
    return (
        <div className="col" key={entry.id} >
            <article className='card p-3 border-0'>
                <Link className='link-dark' href={'/blog/' + entry.id}>
                    <Image
                        className='card-img'
                        src={entry.image_url}
                        alt='Post'
                        width={400}
                        height={250}
                    />
                    <div className='card-body'>
                        <p className='date'>{entry.date}</p>
                        <h3 className='card-title'>{entry.title}</h3>
                    </div>
                </Link>
            </article >
        </div >
    )
}