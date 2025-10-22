import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST, //CHANGE ME
  database: process.env.POSTGRES_DB
});
const blog_query = (text, params) => pool.query(text, params)

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
