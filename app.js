import dotenv from 'dotenv';
import express from 'express';

const app = express();
dotenv.config();
const port = process.env.port;
const hostname = process.env.hostname

app.listen(port, ()=>{
    console.log(`http://${hostname}:${port}`);
})