// index.mjs
import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ensure upload directory exists
const uploadDir = path.join(__dirname, "images");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => cb(null, req.query.filename),
});

const checkAPIKey = (req, res, next) => {
    const apiKey = req.query.api_key;
    if (!apiKey) {
        return res.status(401).json({ error: 'API key missing' });
    }

    if (apiKey !== process.env.IMAGES_API_KEY) {
        return res.status(403).json({ error: 'Invalid API key' });
    }

    next(); // Key is valid, proceed
};


const upload = multer({ storage });

const app = express();
app.use(cors());
app.use(checkAPIKey);

// Serve uploaded images statically
app.use("/images", express.static(uploadDir));

app.get('/all-images', (req, res) => {
    let allImages = ['one'];
    fs.readdir('images/', (err, files) => {
        if (err) {
            console.error('Unable to scan ./images');
            return;
        }
        res.json({ 'images': files })
        return;
    })
})
// Handle file uploads
app.post("/upload", upload.single("image"), (req, res) => {
    res.json({ url: `/images/${req.query.filename}` });
});

app.get('/dir', (req, res) => {
    const directory = uploadDir;
    res.send(directory)
})
// Health check
app.get("/health", (req, res) => res.send("OK"));

const PORT = process.env.PORT || 9002;
app.listen(PORT, () => console.log(`Image server running on port ${PORT}`));