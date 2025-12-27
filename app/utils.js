import { neon } from "@neondatabase/serverless";

export async function getData(id) {
    const sql = neon(process.env.DATABASE_URL);
    const data = await sql`SELECT * FROM blog_entries;`;
    return data;
}

export async function getDataForId(id) {
    const sql = neon(process.env.DATABASE_URL);
    const data = await sql`SELECT * FROM blog_entries WHERE id=${id};`;
    return data;
}