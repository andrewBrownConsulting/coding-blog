import BlogCard from './components/BlogCard';
import Abstract from './components/Abstract';
import Highlight from './components/Highlight';
import DummyHighlight from './components/DummyHighlight.jsx'
import Link from 'next/link';
import { fetchAllBlogData } from './utils';
import { Suspense } from 'react';


export const dynamic = "force-dynamic";
export const metadata = {
  title: "Andrew Brown Blog", // static
};

export default async function HomePage() {
  const blogData = await fetchAllBlogData();
  return (
    <main className='container m-0 p-0'>
      <div className='row'>
        <Abstract />
        <Suspense fallback={<DummyHighlight />}>
          <Highlight />
        </Suspense>
      </div>
      <div className='flex-bar m-4'>
        <h2 className=''>Most Recent Posts</h2>
        <Link href='all-posts'><button className='btn btn-info m-2'>View all Posts</button></Link>
      </div>
      <Suspense>
        <section id='recent posts' className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-2 mb-2'>
          {blogData &&
            blogData.map((entry, index) => {
              if (index != 0 && index <= 6)
                return (<BlogCard key={entry.id} entry={entry} />)
            }
            )
          }
        </section>
      </Suspense>
    </main >
  )
}
