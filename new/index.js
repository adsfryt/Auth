import express from "express"
import WebSocket from "ws";
import WSserver from "express-ws";
import cors from "cors";
import cookie from "cookie";
import  cookieParser from "cookie-parser";
import { WebSocketServer } from 'ws';
import https from "https";
import fs from "fs";
import enforce from "express-sslify";
import cluster from "cluster";
import os from "os";
import {validationResult} from "express-validator";
import Output from "../Output.js";
import tokenUser from "./Router/userRouter.js";
import mongoose from "mongoose"
import subjectRouter from "./Router/subjectRouter.js";

const numCPUs = os.cpus().length;

const db_url = "mongodb+srv://Test123:BsYmUzxwS2SZQzdh@cluster0.yzniy.mongodb.net/\n";
const PORT = 6000;
const app = express();

if (cluster.isMaster) {
    console.log(`Master process ${process.pid} is running`);
    //var worker = cluster.fork();

    app.use(express.json());
    app.use(cookieParser());
    app.use(cors({
        origin: [
           "http://192.168.1.106:3000", "http://localhost:3000", "http://localhost:5000"
        ],
        credentials: true,
    }));
    async function start() {
        try {
            app.listen(PORT, () => console.log('SERVER STARTED ON PORT ' + PORT));
            await mongoose.connect(db_url, {useUnifiedTopology: true, useNewUrlParser: true});

        }catch (e){
            Output(e);
        }
    }
    start();
    app.use('/user',tokenUser);
    app.use('/subject',subjectRouter);

}
