import Link from "next/link";
import { getImageFromId, parseDate, fetchLatestBlog } from "../utils.js";

export const dynamic = "force-dynamic";

export default async function Highlight() {
  const blogData = await fetchLatestBlog();
  const { title, date_created, id } = blogData;
  return (
    <div className='col-12 col-md-6 highlight rounded pt-3'>
      <Link className='link-dark' href={'/blog/' + id}>
        {getImageFromId(id)}
        <h1 >{title} </h1>
        <p>{parseDate(date_created)}</p>
      </Link >
    </div>
  );
} 
