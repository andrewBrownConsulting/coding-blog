'use server'
import { addBlogEntry, deleteEntryWithId, getAllBlogIds, getBlogEntryWithId, updateBlogEntry } from '../db.js'
import { formatArticle } from '../utils.js';
export async function addPost(newArt, title, id, imgCaption, article) {
  const formattedArticle = formatArticle(article)
  if (newArt)
    addBlogEntry(id, title, imgCaption, formattedArticle);
  else
    updateBlogEntry(id, title, imgCaption, formattedArticle)
}
export async function getIds() {
  return getAllBlogIds();
}
export async function serverGetBlogEntryWithId(id) {
  return getBlogEntryWithId(id);
}
export async function serverDeleteEntryWithId(id) {
  return deleteEntryWithId(id);
}
