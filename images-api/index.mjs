import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import cors from "cors";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 9002;
const IMAGES_API_KEY = process.env.IMAGES_API_KEY;


function checkApiKey(req, res, next) {
    const key = req.query.api_key || req.header("x-api-key"); // allow ?api_key= in URL

    if (key && key === IMAGES_API_KEY) {
        return next();
    }
    return res.status(401).json({ error: "Unauthorized: Invalid API Key" });
}


app.use(cors(
    {
        origin: ["http://localhost:3000", "https://localhost:3000", 'https://blog.andrewb.site']
    }
)); // allow all origins

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/images', checkApiKey, express.static(path.join(__dirname, 'images')));
// Set up multer for file uploads
import multer from 'multer';
//upload image with name
const upload = multer({ dest: './images/', });

app.post('/upload', upload.single('image'), (req, res) => {
    console.log('Received file:', req.image);
    if (!req.image) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    res.json({ message: 'Images uploaded successfully' });
});
app.listen(PORT, () => {
    console.log(`Image server running on port ${PORT}`);
});