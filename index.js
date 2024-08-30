import express from 'express'
import cors from 'cors';
import Connection from './db/db.js';
import route from './routers/route.js'
import dotenv from 'dotenv'

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use('/app/v1', route)

const USERID = process.env.USERID;
const PWD = process.env.PASSWORD;

app.listen(8000, ()=>{
    console.log("Listening on port 8000");
});

Connection(USERID, PWD);


