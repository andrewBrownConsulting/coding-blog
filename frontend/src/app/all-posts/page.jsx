import BlogCard from '../components/BlogCard';
import { fetchAllBlogData } from '../utils.js';

export const dynamic = "force-dynamic";

export default async function AllPosts() {
  const blogData = await fetchAllBlogData();
  return (
    <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-2 mb-2'>
      {blogData.map(
        entry => <BlogCard key={entry.id} entry={entry} />
      )
      }
    </div >
  )
}
