import { neon } from "@neondatabase/serverless";
export async function getAllData() {
  console.log("get all data")
  const sql = neon(process.env.DATABASE_URL);
  const data = await sql`SELECT * FROM blog_entries;`;
  const sortedData = data.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
  return sortedData;
}
export async function getDataForId(id) {
  const sql = neon(process.env.DATABASE_URL);
  const data = await sql`SELECT * FROM blog_entries WHERE id=${id};`;
  return data;
}
export async function addBlogEntry(id, title, date, image, article) {
  console.log(id)
  const sql = neon(process.env.DATABASE_URL);
  const data = await sql`
    INSERT INTO blog_entries (id, title, date, image, article)
    VALUES (${id}, ${title}, ${date}, ${image}, ${article})
    RETURNING *
  `;
  return;
}
export async function updateBlogEntry(originalId, id, title, date, image, article) {
  const sql = neon(process.env.DATABASE_URL);
  await sql`
    UPDATE blog_entries
    SET id = ${id}, title = ${title}, date = ${date}, image = ${image}, article = ${article}
    WHERE id = ${originalId}
  `;
}
export async function deleteBlogEntry(id) {
  const sql = neon(process.env.DATABASE_URL);
  await sql`DELETE FROM blog_entries WHERE id = ${id}`;
}

export async function getJsonData() {
  const data = await import('./posts.json').then(module => module.default.posts);
  const sortedData = data.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
  return sortedData;
}
//
// export async function getDataForId(id) {
//   const data = await import('./posts.json').then(module => module.default.posts);
//   return data.filter(i => i.id == id);
// }

export function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, options);
}
