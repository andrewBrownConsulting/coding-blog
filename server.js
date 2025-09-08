import fs from "fs";
import https from "https";
import http from "http";
import path from "path";
import express from "express";
import db from './db.js';
import cors from "cors";
const app = express();

// CORS middleware
app.use(cors({ origin: ['https://localhost:3000', 'https://blog.andrewb.site', 'https://192.168.1.159:3000'] }));


const PORT = process.env.PORT || 9000;
app.get('/database', async (req, res) => {
    try {
        const database = await db.query('select * from blog_entries');
        console.log(database.rows);
        res.json(database.rows);
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving data from database');
    }
});
app.get('/database/:id', async (req, res) => {
    try {
        const id = req.params.id;
        console.log("Fetching entry with id:", id);
        db.query('select * from blog_entries where id = $1', [id])
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
app.get('/', (req, res) => {
    res.send('Hello, this is the Express server!\n Access /database to get the blog data.');
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