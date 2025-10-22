'use client'
import { useState, useEffect } from 'react'
import { getBlogEntryWithId } from '../db.js'
export default function Home() {
  const [id, setId] = useState();
  const [blogData, setBlogData] = useState();
  // title
  // id
  // img_src
  // caption
  // article
  async function getBlogData(id) {
    'use server'
    const currentBlogData = await getBlogEntryWithId(id);
    setBlogData(currentBlogData);
  }
  useEffect(() => {
    getBlogData(id);
  }, [id])
  return (
    <div>
      <input value={id} onChange={e => setId(e.target.value)} />
      {blogData && <h1>{blogData.title}</h1>}
    </div>
  );
}
