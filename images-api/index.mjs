import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 9002;
import cors from "cors";
app.use(cors(
    {
        origin: ["http://localhost:3000", 'https://blog.andrewb.site']
    }
)); // allow all origins

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/images', express.static(path.join(__dirname, 'images')));


app.listen(PORT, () => {
    console.log(`Image server running on port ${PORT}`);
});