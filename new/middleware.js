import TokenManager from "./tokenManager.js"
import User from "./Schema/userShema.js";
export default  async function (req,res,next) {
    try {

        var access_token = req.query.access_token;
        if(!access_token){
            access_token = req.body.access_token;
        }

        if(!access_token){
            res.status(403);
            res.json({"error":"no found token"});
            return;
        }

        //console.log(req);
        var Data = TokenManager.checkAccessToken(access_token);
        //console.log(Data)
        if(!Data){
            res.status(401).json({"error": 0});
            return;
        }
        let user = await User.findOne({userid:Data.userId})
        if(user.blocked){
            res.status(418).json({"error": "you have blocked"});
            return;
        }
        if( user.activate === false){
            res.status(200).json({"activate": false});
            return;
        }
        console.log("vvv")
        res.locals = Data;
        next();
    } catch (e) {
        res.status(500).json({"error":"server"});
        return 0;
    }
}