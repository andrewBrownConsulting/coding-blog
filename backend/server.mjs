import fs from "fs";
import https from "https";
import http from "http";
import path from "path";
import express from "express";
import { blog_query } from './db.mjs'
import cors from "cors";
const app = express();

// CORS middleware
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello, this is the Express server!\n Access /database to get the blog data.');
});
const PORT = process.env.PORT || 9000;
app.get('/database', async (req, res) => {
    try {
        const database = await blog_query('select * from blog_entries order by date_created DESC');
        res.json(database.rows);
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving data from database');
    }
});
app.get('/latest', async (req, res) => {
    try {
        const database = await blog_query('select * from blog_entries order by date_created DESC limit 5');
        res.json(database.rows[0]);
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving data from database');
    }
});
app.get('/database/:id', async (req, res) => {
    try {
        const id = req.params.id;
        blog_query('select * from blog_entries where id = $1', [id])
            .then(result => {
                if (result.rows.length === 0) {
                    res.status(404).send('Entry not found');
                } else {
                    res.json(result.rows[0]);
                }
            })
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving data from database');
    }
});
app.post('/new-article', express.json(), async (req, res) => {
    try {
        console.log(req.body);
        const { id, title, image_url, image_caption, article } = req.body;

        const SQLformattedArticle = '{"' + article.join('", "') + '"}';
        const date = new Date().toISOString();
        blog_query('INSERT INTO blog_entries (id, title, image_url, image_caption, article, date_created) VALUES ($1, $2, $3, $4, $5, $6)', [id, title, image_url, image_caption, SQLformattedArticle, date])
            .then(() => {
                res.status(201).send({ response: 'New article created successfully' });
            })
    } catch (err) {
        console.error(err);
        res.status(500).send({ response: 'Error creating new article' });
    }
});

app.post('/test-article', express.json(), async (req, res) => {
    try {
        const { id, title, image_url, image_caption, article } = { id: 'abc', title: 'Test Title', image_url: 'https://example.com/image.jpg', image_caption: 'Test Caption', article: '{"This is a test article."}' };
        blog_query('INSERT INTO blog_entries (id, title, image_url, image_caption, article, date_created) VALUES ($1, $2, $3, $4, $5, $6)', [id, title, image_url, image_caption, article, new Date()])
            .then(() => {
                res.status(201).send('New article created successfully');
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send('Error creating new article');
            });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error creating new article');
    }
});

// Load SSL key & certificate
const options = {
    key: fs.readFileSync(path.join("certs", "server.key")),
    cert: fs.readFileSync(path.join("certs", "server.cert"))
};

// Create HTTPS server
https.createServer(options, app).listen(PORT, () => {
    console.log("✅ Express server running on https://localhost:" + PORT);
});
http.createServer(options, app).listen((PORT + 1), () => {
    console.log("✅ Express server running on http://localhost:" + (PORT + 1));
});