import fs from "fs";
import https from "https";
import http from "http";
import path from "path";
import express from "express";
import db from './db.js';

// Enable CORS for all routes
// This allows your Next.js frontend to access this backend server
// when they are running on different ports during development

// Apply CORS middleware to all routes
const app = express();
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

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