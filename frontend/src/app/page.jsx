'use client'
import BlogCard from './components/BlogCard';
import Abstract from './components/Abstract';
import Highlight from './components/Highlight';
import Link from 'next/link';
import { useState, useEffect } from 'react';
export default function HomePage() {
  const [blogData, setBlogData] = useState();
  async function fetchBlogData(){
    const res = await fetch('http://localhost:9001/database')
    const data = await res.json();
    setBlogData(data);
  } 
  useEffect(
    () => {
      document.title = 'Andrew Brown Blog'
      console.log('the s3 url is' , process.env.NEXT_PUBLIC_IMAGES_BASE_URL)
      fetchBlogData();
    }, []);
  return (
    <main className='container m-0 p-0'>
      <div className='row'>
        <Abstract />
        <Highlight />
      </div>
      <div className='flex-bar m-4'>
        <h2 className=''>Most Recent Posts</h2>
        <Link href='all-posts'><button className='btn btn-info m-2'>View all Posts</button></Link>
      </div>
      <section id='recent posts' className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-2 mb-2'>
        {blogData &&
          blogData.map((entry, index) => {
            if (index != 0 && index <= 6)
              return (<BlogCard key={entry.id} entry={entry} />)
          }

          )
        }
      </section>
    </main >
  )
}
