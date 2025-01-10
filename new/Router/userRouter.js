import Router from 'express'
import Output from "../../Output.js";
const  userRouter = new Router();
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import Request from "../../Request.js";
import TokenManager from '../tokenManager.js';
import Data from "../data.js";
import * as querystring from "node:querystring";
import User from "../Schema/userShema.js";
import jwt from "jsonwebtoken";
import Middleware from "../middleware.js";

let SessionTokenList = {};

userRouter.get('/link_reg_yandex',  async (req, res)=>{
    try{
        res.json({link: "https://oauth.yandex.ru/authorize?response_type=code&client_id="+Data.Yandex_client_id });
    }
    catch (e) {
        res.status(500).json({"error":"server"});
    }});

userRouter.get('/link_reg_github',  async (req, res)=>{
    try{
        res.json({link: "https://github.com/login/oauth/select_account?client_id=" + Data.Github_client_id + "&response_type=code"});
    }
    catch (e) {
        res.status(500).json({"error":"server"});
    }});



userRouter.get('/link_reg_yandex_tg',  async (req, res)=>{
    try{
        var {session_token} = req.query;

        res.json({link: "https://oauth.yandex.ru/authorize?response_type=code&client_id="+Data.Yandex_client_id_tg + "&state=" + session_token});

    }
    catch (e) {
        res.status(500).json({"error":"server"});
    }});

userRouter.get('/link_reg_github_tg',  async (req, res)=>{
    try{
        var {session_token} = req.query;
        res.json({link: "https://github.com/login/oauth/select_account?client_id=" + Data.Github_client_id_tg + "&response_type=code" + "&state=" + session_token});

    }
    catch (e) {
        res.status(500).json({"error":"server"});
    }});

//доделать
// userRouter.get('/reg_yandex_tg',  async (req, res)=>{
//     try{
//         var {code,state} = req.query;
//
//
//         console.log("tg")
//         let responce_yandex_token = await axios.post("https://oauth.yandex.ru/token",
//             querystring.stringify({
//                 "grant_type":"authorization_code",
//                 "code":code,
//                 "client_id":Data.Yandex_client_id_tg,
//                 "client_secret":Data.Yandex_secret_tg
//             }),
//             {
//                 headers:{
//                     "Content-Type":"application/x-www-form-urlencoded"
//                 }
//             })
//
//         let {access_token, refresh_token} = responce_yandex_token.data;
//
//         if(!(access_token && refresh_token)){
//             res.status(400).json({"error":"can't get info"});
//             return;
//         }
//         let responce_yandex = await axios.get("https://login.yandex.ru/info?format=json&oauth_token="+access_token)
//         let {login, id, first_name, last_name, default_email } = responce_yandex.data;
//         id = "yandex" + id;
//         if(!last_name){
//             last_name = "none";
//         }
//         if(!first_name){
//             first_name = "none";
//         }
//         if(!default_email){
//             default_email = "none";
//         }
//         var user = await User.findOne({userId:id})
//
//         var userDto = {login:login, userId:id};
//         var accessToken = jwt.sign({...userDto}, Data.AccessToken, {expiresIn:'40m'});
//         var refreshToken = jwt.sign({...userDto}, Data.RefreshToken, {expiresIn:'30d'});
//
//         if(user){
//             user.refreshTokenService = refresh_token;
//             user.accessTokenService = access_token;
//
//             user.refreshToken.push(refreshToken);
//
//             if(user.activate){
//
//                 SessionTokenList[state] = {
//                     refresh_token:refreshToken,
//                     access_token:accessToken,
//                     userId:id
//                 };
//             }
//             else{
//                 SessionTokenList[state] = {
//                     refresh_token:refreshToken,
//                     access_token:accessToken,
//                     activate:false,
//                     userId:id
//                 };
//             }
//             await user.save();
//
//         }else{
//             await User.create({
//                 "login": login,
//                 "userId": id,
//                 "email": default_email,
//                 "state": "some",
//                 "role": -1,
//                 "firstName":first_name,
//                 "lastName":last_name,
//                 "patronymic":"none",
//                 "activate": false,
//                 "subjectsId": [],
//                 "method": "yandex",
//                 "refreshTokenService": refresh_token,
//                 "accessTokenService": access_token,
//                 "refreshToken": [ refreshToken ],
//                 "telegramId":"none",
//                 "code":"none",
//                 "blocked":false,
//             });
//             console.log("2tg")
//             SessionTokenList[state] = {
//                 refresh_token:refreshToken,
//                 access_token:accessToken,
//                 activate:false,
//                 userId:id
//             };
//         }
//
//
//     }
//     catch (e) {
//         console.log(e)
//         res.status(500).json({"error":"server"});
//     }});
//доделать
// userRouter.get('/reg_github_tg',  async (req, res)=>{
//     try{
//         var {code,state} = req.query;
//         console.log("git_tg")
//         let response_github_token = await axios.get(
//             "https://github.com/login/oauth/access_token",
//             {
//                 params: {
//                     client_id: Data.Github_client_id_tg,
//                     client_secret: Data.Github_secret_tg,
//                     code: code,
//
//                 },
//                 headers: {
//                     "Accept": "application/json",
//                     "Accept-Encoding": "application/json",
//                 },
//             }
//         );
//         console.log("git_tg")
//         let {access_token}= response_github_token.data;
//
//         let refresh_token = "none";
//         if(!(access_token)){
//             res.status(400).json({"error":"can't get info"});
//             return;
//         }
//         console.log("git_tg")
//         let responce_github = await axios.get("https://api.github.com/user",{headers:{"Authorization":"Bearer " + access_token}})
//         let { login, id, email } = responce_github.data;
//         id = "github" + id;
//         let first_name = login;
//         if(!email){
//             email= "none";
//         }
//         console.log("git_tg")
//         var user = await User.findOne({userId:id})
//
//         var userDto = {login:login, userId:id};
//         var accessToken = jwt.sign({...userDto}, Data.AccessToken, {expiresIn:'40m'});
//         var refreshToken = jwt.sign({...userDto}, Data.RefreshToken, {expiresIn:'30d'});
//         console.log("git_tg")
//         if(user){
//             user.refreshTokenService = refresh_token;
//             user.accessTokenService = access_token;
//             console.log("1")
//             user.refreshToken.push(refreshToken);
//
//             if(user.activate){
//
//                 SessionTokenList[state] = {
//                     refresh_token:refreshToken,
//                     access_token:accessToken,
//                     userId:id
//                 };
//             }
//             else{
//                 SessionTokenList[state] = {
//                     refresh_token:refreshToken,
//                     access_token:accessToken,
//                     activate:false,
//                     userId:id
//                 };
//             }
//             await user.save();
//
//         }else{
//             console.log("1!")
//             await User.create({
//                 "login": login,
//                 "userId": id,
//                 "email": email,
//                 "state": "some",
//                 "role": -1,
//                 "firstName":first_name,
//                 "lastName":"none",
//                 "patronymic":"none",
//                 "activate": false,
//                 "subjectsId": [],
//                 "method": "github",
//                 "refreshTokenService": refresh_token,
//                 "accessTokenService": access_token,
//                 "refreshToken": [ refreshToken ],
//                 "telegramId":"none",
//                 "code":"none",
//                 "blocked":false,
//             });
//             console.log("2gittg")
//             SessionTokenList[state] = {
//                 refresh_token:refreshToken,
//                 access_token:accessToken,
//                 activate:false,
//                 userId:id
//             };
//         }
//
//     }
//     catch (e) {
//
//         res.status(500).json({"error":"server"});
//     }});
// //доделать
// userRouter.post('/login',  async (req, res)=>{
//     try{
//         var {session_token} = req.body;
//
//         if(SessionTokenList[session_token] && SessionTokenList[session_token].refresh_token !== "none"){
//             res.json(SessionTokenList[session_token]);
//             delete SessionTokenList[session_token];
//             return;
//         }
//         res.status(400).json({"error":"can't find token"});
//     }
//     catch (e) {
//         res.status(500).json({"error":"server"});
//     }});

// а может и не надо


userRouter.get('/reg_yandex',  async (req, res)=>{
    try{
        var {code,type} = req.query;


        console.log("ghhgh")
        let responce_yandex_token = await axios.post("https://oauth.yandex.ru/token",
            querystring.stringify({
                "grant_type":"authorization_code",
                "code":code,
                "client_id": type === "tg" ? Data.Yandex_client_id_tg :Data.Yandex_client_id,
                "client_secret": type === "tg" ? Data.Yandex_secret_tg : Data.Yandex_secret
            }),
            {
                headers:{
                "Content-Type":"application/x-www-form-urlencoded"
                }
            })
        console.log("ghhgh1")
        let {access_token, refresh_token} = responce_yandex_token.data;

        if(!(access_token && refresh_token)){
            res.status(400).json({"error":"can't get info"});
            return;
        }
        console.log("ghhgh2")
        let responce_yandex = await axios.get("https://login.yandex.ru/info?format=json&oauth_token="+access_token)
        let {login, id, first_name, last_name, default_email } = responce_yandex.data;
        id = "yandex" + id;
        if(!last_name){
            last_name = "none";
        }
        if(!first_name){
            first_name = "none";
        }
        if(!default_email){
            default_email = "none";
        }
        console.log("ghhgh2.5")
        var user = await User.findOne({userId:id})
        console.log("ghhgh3")
        var userDto = {login:login, userId:id};
        var accessToken = jwt.sign({...userDto}, Data.AccessToken, {expiresIn:'40m'});
        var refreshToken = jwt.sign({...userDto}, Data.RefreshToken, {expiresIn:'30d'});
        console.log("ghhgh4")
        if(user){
            user.refreshTokenService = refresh_token;
            user.accessTokenService = access_token;

            user.refreshToken.push(refreshToken);
            console.log("1")
            if(user.activate){
            res.json({
                refresh_token:refreshToken,
                    access_token:accessToken,
                userId:id
                });
            }
            else{
                res.json({
                    refresh_token:refreshToken,
                    access_token:accessToken,
                    activate:false,
                    userId:id
                });
            }
            await user.save();

        }else{
            await User.create({
                "login": login,
                "userId": id,
                "email": default_email,
                "state": "some",
                "role": -1,
                "firstName":first_name,
                "lastName":last_name,
                "patronymic":"none",
                "activate": false,
                "subjectsId": [],
                "method": "yandex",
                "refreshTokenService": refresh_token,
                "accessTokenService": access_token,
                "refreshToken": [ refreshToken ],
                "telegramId":"none",
                "code":"none",
                "blocked":false,
            });
            console.log("2")
            res.json(
                {refresh_token:refreshToken,
                    access_token:accessToken,
                    activate:false,
                    userId:id
                });
        }


    }
    catch (e) {

        res.status(500).json({"error":"server"});
    }});

userRouter.get('/reg_github',  async (req, res)=>{
    try{
        var {code,type} = req.query;
        console.log("git")
        let response_github_token = await axios.get(
            "https://github.com/login/oauth/access_token",
            {
                params: {
                    client_id:type === "tg" ? Data.Github_client_id_tg : Data.Github_secret,
                    client_secret:type === "tg" ? Data.Github_secret_tg : Data.Github_secret,
                    code: code,

                },
                headers: {
                    "Accept": "application/json",
                    "Accept-Encoding": "application/json",
                },
            }
        );

        let {access_token}= response_github_token.data;

        let refresh_token = "none";
        if(!(access_token)){
            res.status(400).json({"error":"can't get info"});
            return;
        }
        let responce_github = await axios.get("https://api.github.com/user",{headers:{"Authorization":"Bearer " + access_token}})
        let { login, id, email } = responce_github.data;
        id = "github" + id;
        let first_name = login;
        if(!email){
            email= "none";
        }

        var user = await User.findOne({userId:id})

        var userDto = {login:login, userId:id};
        var accessToken = jwt.sign({...userDto}, Data.AccessToken, {expiresIn:'40m'});
        var refreshToken = jwt.sign({...userDto}, Data.RefreshToken, {expiresIn:'30d'});

        if(user){
            user.refreshTokenService = refresh_token;
            user.accessTokenService = access_token;
            console.log("1")
            user.refreshToken.push(refreshToken);

            if(user.activate){

                res.json({
                    refresh_token:refreshToken,
                    access_token:accessToken,
                    userId:id
                });
            }
            else{
                res.json({
                    refresh_token:refreshToken,
                    access_token:accessToken,
                    activate:false,
                    userId:id
                });
            }
            await user.save();

        }else{
            console.log("1!")
            await User.create({
                "login": login,
                "userId": id,
                "email": email,
                "state": "some",
                "role": -1,
                "firstName":first_name,
                "lastName":"none",
                "patronymic":"none",
                "activate": false,
                "subjectsId": [],
                "method": "github",
                "refreshTokenService": refresh_token,
                "accessTokenService": access_token,
                "refreshToken": [ refreshToken ],
                "telegramId":"none",
                "code":"none",
                "blocked":false,
            });
            console.log("2")
            res.json(
                {refresh_token:refreshToken,
                    access_token:accessToken,
                    activate:false,
                    userId:id
                });
        }

    }
    catch (e) {

        res.status(500).json({"error":"server"});
    }});



userRouter.post('/logout',Middleware ,  async (req, res)=>{
    try{
        var {access_token,refresh_token} = req.body;
        if (!access_token) {
            return res.status(400).json("not found token")
        }
        var user = await User.findOne({userId: res.locals.userId});
        if (!user) {
            res.status(400).json({"error":"not found user"});
            return;
        }

        for (let i = 0; i < user.refreshToken.length; i++) {
            if(user.refreshToken[i] === refresh_token){
                user.refreshToken.splice(i,1);
                await user.save();
                res.json({ok: true});
                return;

            }
        }

        res.status(400).json({"error":"can't find refresh_token"});
    }
    catch (e) {
        res.status(500).json({"error":"server"});
    }});

userRouter.post('/full_logout',Middleware ,  async (req, res)=>{
    try{
        var {access_token} = req.body;
        if (!access_token) {
            return res.status(400).json("not found token")
        }
        var user = await User.findOne({userId: res.locals.userId});
        if (!user) {
            res.status(400).json({"error":"not found user"});
            return;
        }

        user.refreshToken = [];

        await user.save();
        res.json({userId:res.locals.userId});
    }
    catch (e) {
        console.log(e)
        res.status(500).json({"error":"server"});
    }});


userRouter.get('/get_data',Middleware ,  async (req, res)=>{
    try{
        // var {access_token} = req.query;

        var user = await User.findOne({userId:res.locals.userId})
        if(user.activate) {
            let data = {...user._doc}
            delete data.refreshTokenService;
            delete data.accessTokenService;
            delete data.refreshToken;
            delete data._id;
            res.json( data)
            return;
        }else{
            res.json({activate:false})
            return;
        }
        //console.log(res.locals.userId)
    }
    catch (e) {

        res.status(500).json({"error":"server"});
    }});

userRouter.get('/get_public_data', Middleware, async (req, res)=>{
    try{
        var {userId} = req.query;

        var user = await User.findOne({userId:userId})
        if(user.activate) {
            let data = {...user._doc}
            delete data.refreshTokenService;
            delete data.accessTokenService;
            delete data.refreshToken;
            delete data._id;
            delete data.telegramId;
            delete data.email;
            delete data.code;
            res.json( data)
            return;
        }else{
            res.json({activate:false})
            return;
        }
        //console.log(res.locals.userId)
    }
    catch (e) {

        res.status(500).json({"error":"server"});
    }});

userRouter.post('/update_data',Middleware ,  async (req, res)=>{
    try{

        let {patronymic, firstName, lastName, login } = req.body;

        var user = await User.findOne({userId:res.locals.userId})

        if(user) {
            if (patronymic) {
                user.patronymic = patronymic;
            }
            if (firstName) {
                user.firstName = firstName;
            }
            if (lastName) {
                user.lastName = lastName;
            }
            if (login) {
                user.login = login;
            }
            await user.save();
            res.json({ok:true});
        }else{
            throw new Error("");
        }

        //console.log(res.locals.userId)
    }
    catch (e) {
        console.log(e)
        res.status(500).json({"error":"server"});
    }});

userRouter.post('/submit_role',Middleware ,  async (req, res)=>{
    try{
        var {role} = req.body;

        var user = await User.findOne({userId:res.locals.userId})
        if(!user.activate) {
            switch (role){
                case "student":{
                    user.role= 0;
                    break;
                }
                case "teacher":{
                    user.role= 1;
                    break;
                }
                default:{
                    res.status(400).json({error:"wrong role"})
                    return;
                    break;
                }
            }
            console.log(user.activate)
            user.activate = true;
            await user.save();
            res.status(200).json({ok:true});
        }else{
            res.status(400).json({error:"not inactive"})
            return;
        }
        //console.log(res.locals.userId)
    }
    catch (e) {

        res.status(500).json({"error":"server"});
    }});

userRouter.post('/submit_code',  async (req, res)=>{
    try{
        var {code} = req.body;

        if(code === "none"){
            res.status(400).json({"error":"can't find user"});
            return;
        }
        var user = await User.findOne({code:code});

        if(user){
            var userDto = {login:user.login, userId:user.userId};
            var accessToken = jwt.sign({...userDto}, Data.AccessToken, {expiresIn:'40m'});
            var refreshToken = jwt.sign({...userDto}, Data.RefreshToken, {expiresIn:'30d'});

            user.refreshToken.push(refreshToken);
            await user.save();
            if(user.activate){

                res.json({
                    refresh_token:refreshToken,
                    access_token:accessToken,
                });
            }
            else{
                res.json({
                    refresh_token:refreshToken,
                    access_token:accessToken,
                    activate:false
                });
            }

            return;
        }else{
            res.status(400).json({"error":"can't find user"});
            return;
        }


        //console.log(res.locals.userId)
    }
    catch (e) {

        res.status(500).json({"error":"server"});
    }});

userRouter.get('/get_code',Middleware ,  async (req, res)=>{
    try{

        var user = await User.findOne({userId:res.locals.userId})
        if(user) {
            user.code = "";
            user.code += String(Math.round(Math.random()*10));
            user.code += String(Math.round(Math.random()*10));
            user.code += String(Math.round(Math.random()*10));
            user.code += String(Math.round(Math.random()*10));
            user.code += String(Math.round(Math.random()*10));
            user.code += String(Math.round(Math.random()*10));
            res.json({code:user.code});
            await user.save();
        }else{
            res.status(400).json({"error":"not found user"});
        }

        //console.log(res.locals.userId)
    }
    catch (e) {
        console.log(e)
        res.status(500).json({"error":"server"});
    }});



userRouter.post("/refresh", async(req, res) =>{
    try {
        var {refresh_token} = req.body;

        if (!refresh_token) {
            return res.status(400).json("not found token")
        }

        var refreshData = TokenManager.checkRefreshToken(refresh_token);
        if(!refreshData){
            return res.status(400).json("not found token");
        }
        var user = await User.findOne({userId: refreshData.userId});
        if (!user) {
             res.status(400).json({"error":"not found user"});
             return;
        }

        var accessToken, refreshToken;

        for (let i = 0; i < user.refreshToken.length; i++) {
            if(user.refreshToken[i] === refresh_token){

                var userDto = {login: user.login, userId: refreshData.userId};
                accessToken = jwt.sign({...userDto}, Data.AccessToken, {expiresIn:'40m'});
                refreshToken = jwt.sign({...userDto}, Data.RefreshToken, {expiresIn:'30d'});
                user.refreshToken[i] = refreshToken;
                await user.save();
                break;
            }
        }

        return res.json({access_token: accessToken, refresh_token: refreshToken, userId: refreshData.userId});
    }
    catch (e) {
        console.log(e)
        res.status(500).json({"error":"server"});
    }
} );
export default userRouter;