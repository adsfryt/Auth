import Router from 'express'
import Output from "../../Output.js";
const  subjectRouter = new Router();
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import TokenManager from '../tokenManager.js';
import Data from "../data.js";
import * as querystring from "node:querystring";
import User from "../Schema/userShema.js";
import jwt from "jsonwebtoken";
import Middleware from "../middleware.js";

subjectRouter.post('/add_subject',  async (req, res)=>{
    try{

        let {userId, subjectId} = req.body;

        var user = await User.findOne({userId:userId})


        if(!user || !subjectId){
            res.status(400).json({"error":"not found user"});
            return;
        }

        for (let i = 0; i < user.subjectsId.length; i++) {
            if(user.subjectsId[i] === subjectId){
                res.json({ok:true});
                return;
            }
        }
        //console.log(user.subjectsId)
        user.subjectsId.push(subjectId);
        //console.log(user.subjectsId)
        await user.save();
        return res.json({ok:true});
        //console.log(res.locals.userId)
    }
    catch (e) {
        console.log(e)
        res.status(500).json({"error":"server"});
    }});

subjectRouter.post('/delete_subject',  async (req, res)=>{
    try{

        let {userId, subjectId} = req.body;

        var user = await User.findOne({userId:userId})


        if(!user || !subjectId){
            res.status(400).json({"error":"not found user"});
            return;
        }
        console.log("user.subjectsId")

        for (let i = 0; i < user.subjectsId.length; i++) {
            if(user.subjectsId[i] === subjectId){
                console.log(subjectId)
                console.log(user.subjectsId)
                user.subjectsId.splice(i,1);
                console.log(user.subjectsId)
                await user.save();
                return res.json({ok:true});

            }
        }
        //console.log(res.locals.userId)
    }
    catch (e) {
        console.log(e)
        res.status(500).json({"error":"server"});
    }});


export default subjectRouter;