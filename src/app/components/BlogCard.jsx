import Link from "next/link";
import Image from "next/image";
import { parseDate, getImageFromId } from "../utils.js";
export default function BlogCard({ entry }) {
    console.log(entry);
    return (
        <div className="col" key={entry.id} >
            <article className='card p-3 border-0'>
                <Link className='link-dark' href={'/blog/' + entry.id}>
                    {getImageFromId(entry.id)}
                    <div className='card-body'>
                        <p className='date'>{parseDate(entry.date_created)}</p>
                        <h3 className='card-title'>{entry.title}</h3>
                    </div>
                </Link>
            </article >
        </div >
    )
}