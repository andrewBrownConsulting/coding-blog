import { Pool } from 'pg';
const pool = new Pool({
    user: 'postgres',
    password: '1234', host: 'db',
    database: 'blog_db'
});
export const blog_query = (text, params) => pool.query(text, params)
