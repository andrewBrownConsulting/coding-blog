'use client'
import { useState, useEffect } from 'react'
import { addPost, getIds, serverGetBlogEntryWithId } from './addPost';

export default function Home() {
  const [newArticle, setNewArticle] = useState(false)
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [imgCaption, setImgCaption] = useState('');
  const [article, setArticle] = useState([]);
  const [ids, setIds] = useState([]);
  function handleArticleChange(input) {
    setArticle(input)
  }
  async function getAndAwaitIds() {
    const ids = await getIds();
    const mappedIds = ids.map((val) => val.id)
    setIds(mappedIds);
  }
  async function awaitBlogEntry(id) {
    const { title, article, image_caption } = await serverGetBlogEntryWithId(id);
    setTitle(title);
    const parsedArticle = article.join('\n');
    setArticle(parsedArticle)
    setImgCaption(image_caption)
  }
  function handleIdChange(newId) {
    setId(newId);
    awaitBlogEntry(newId);
  }
  useEffect(() => {
    getAndAwaitIds();
  }, [])
  return (
    <div>
      <button onClick={(e) => { e.preventDefault; setNewArticle(!newArticle) }}>Create New Article</button>
      <form action={() => addPost(newArticle, title, id, imgCaption, article)}>
        <br />
        {!newArticle && <select onChange={(e) => handleIdChange(e.target.value)}>
          {ids.map((id) => <option key={id}>{id}</option>)}
        </select>
        }
        {newArticle &&
          <label>Id</label>
        }
        {newArticle &&
          <input value={id} onChange={e => setId(e.target.value)} />
        }
        <br />
        <label>Title</label>
        <input value={title} onChange={e => setTitle(e.target.value)} />
        <br />
        <label>Image Caption</label>
        <input value={imgCaption} onChange={e => setImgCaption(e.target.value)} />
        <br />
        <textarea rows={50} value={article} onChange={e => handleArticleChange(e.target.value)} />
        <br />
        <button type='submit'>Submit</button>
      </form>
    </div >
  );
}
