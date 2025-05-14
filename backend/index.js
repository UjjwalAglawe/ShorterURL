import express from "express";
// import { PrismaClient } from "@prisma/client";
import pkg from "@prisma/client";

const { PrismaClient } = pkg;
import crypto from 'crypto';
import validUrl from 'valid-url';
import cors from 'cors';


const client = new PrismaClient();

const app = express();

app.use(express.json());

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
}));

const baseURL = "https://shorterurl-zsqv.onrender.com";

function generateShortUrl(url) {

    const hash = crypto.createHash('sha256').update(url).digest('base64url');


    return hash.slice(0, 6);
}

app.get('/', (req, res) => {
    res.json({
        message: "Working"
    })
});



app.post('/', async (req, res) => {
    let { url } = req.body;

    if (!url) {
        return res.status(400).json({ message: "URL is required" });
    }


    if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = "https://" + url;
    }


    if (!validUrl.isWebUri(url)) {
        return res.status(400).json({ message: "Invalid URL format" });
    }

    const hash = generateShortUrl(url);
    const shortUrl = `${baseURL}/${hash}`;

    try {

        const existing = await client.url.findFirst({
            where: { Mainurl: url }
        });

        if (existing) {
            return res.json({
                message: "URL already shortened",
                shortUrl: `${baseURL}/${existing.Suburl}`
            });
        }
        const data = await client.url.create({
            data: {
                Mainurl: url,
                Suburl: hash
            }
        });

        res.json({
            message: "URL Shortened",
            shortUrl: shortUrl
        });

    } catch (error) {
        console.error(" Error during URL shortening:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
});




app.get('/:hashvalue', async (req, res) => {
    const hashvalue = req.params.hashvalue;

    try {
        const data = await client.url.findFirst({
            where: {
                Suburl: hashvalue
            }
        });



        if (!data) {
            return res.status(404).json({ message: "Short URL not found" });
        }


        let redirectUrl = data.Mainurl;
        if (!redirectUrl.startsWith("http://") && !redirectUrl.startsWith("https://")) {
            redirectUrl = "https://" + redirectUrl;
        }

        console.log("Redirecting to:", redirectUrl);
        res.redirect(redirectUrl);

    } catch (error) {
        console.error(" Error during redirect:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
