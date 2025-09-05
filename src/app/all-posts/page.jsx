'use client'
import { useState, useEffect } from 'react'
import BlogCard from '../components/BlogCard';
export default function AllPosts() {
    const [blogData, setBlogData] = useState();
    useEffect(
        () => {
            document.title = 'Andrew Brown Blog'
            fetch('https://localhost:9000/database')
                .then(response => response.json())
                .then(data => setBlogData(data))
        }, []
    )
    return (
        <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-2 mb-2'>
            {blogData &&
                blogData.blogEntries.map(
                    entry => <BlogCard key={entry.id} entry={entry} />
                )
            }
        </div >
    )
}