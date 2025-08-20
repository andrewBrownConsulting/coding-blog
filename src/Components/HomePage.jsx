import BlogCard from './BlogCard';
import Abstract from './Abstract';
import { useEffect, useState } from 'react';

export default function HomePage() {
    const [blogData, setBlogData] = useState();
    useEffect(
        () => {
            document.title = 'Andrew Brown Blog'
            fetch('/blog-db.json')
                .then(response => response.json())
                .then(data => setBlogData(data))
        }, []
    )
    return (
        <main className='container m-0 p-0'>
            <Abstract />
            <div className='flex-bar'>
                <h1 className=''>Most Recent Posts</h1>
                <button className='btn btn-alert'>View all Posts</button>
            </div>
            <section id='recent posts' className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-2 mb-2'>
                {blogData &&
                    blogData.blogEntries.map(
                        entry => {
                            return <BlogCard key={entry.id} entry={entry} />
                        }
                    )
                }
            </section>
        </main>
    )
}