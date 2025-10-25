import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST, //CHANGE ME
  database: process.env.POSTGRES_DB
});
const blog_query = (text, params) => pool.query(text, params)

export async function getAllBlogIds() {
  makeDataTable();
  const database = await blog_query('select id from blog_entries');
  return database.rows;
}
export async function getAllBlogEntries() {
  const database = await blog_query('select * from blog_entries order by date_created DESC');
  return database.rows;
}
export async function getLatestBlogEntry() {
  const database = await blog_query('select * from blog_entries order by date_created DESC LIMIT 1');
  return database.rows[0];
}
export async function getBlogEntryWithId(id) {
  const database = await blog_query('select * from blog_entries WHERE id = $1', [id]);
  return database.rows[0];
}
export async function addBlogEntry(id, title, img_caption, article) {
  let date_created = new Date();
  const database = await blog_query('INSERT INTO blog_entries (id, title, date_created, image_url, image_caption, article) VALUES ($1, $2, $3, $4, $5, $6)', [id, title, date_created, "N/A", img_caption, article]);
  console.log(database)
  return database.rows[0];
}
export async function updateBlogEntry(id, title, img_caption, article) {
  const database = await blog_query('UPDATE blog_entries set title = $1, image_caption=$2, article=$3 where id=$4', [title, img_caption, article, id]);
  console.log(database)
}
export async function makeDataTable() {
  let tableQuery = 'create table if not exists blog_entries (\n'
    + 'id text,\n'
    + 'title text,\n'
    + 'date_created date,\n'
    + 'image_url text,\n'
    + 'image_caption text,\n'
    + 'article text[]\n'
    + ')';
  blog_query(tableQuery);
}
