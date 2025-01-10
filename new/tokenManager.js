import Request from "../Request.js";
import jwt from "jsonwebtoken";
import Data from "./data.js";
export default new class TokenManager {
    checkAccessToken(token){
        try {
            var userData = jwt.verify(token,Data.AccessToken)
            return userData;
        }catch (e) {
            return null;
        }
    }
    checkRefreshToken(token){
        try {
            var userData = jwt.verify(token,Data.RefreshToken)
            return userData;
        }catch (e) {
            return null;
        }
    }

    // async RefreshToken(refreshToken, res){
    //     try {
    //         console.log("88");
    //         console.log(refreshToken);
    //         console.log(refreshToken);
    //         if(!refreshToken){
    //             res.status(401);
    //             return "not found";
    //         }
    //         console.log("//");
    //         var refreshData =  this.checkRefreshToken(refreshToken);
    //         var tokenrData = await Token.findOne({refreshToken});
    //         console.log("////");
    //         //console.log(refreshData);
    //         //console.log(tokenrData);
    //         console.log(refreshToken)
    //         if(!tokenrData || !refreshData){
    //             res.status(401);
    //             return "not found";
    //         }
    //         //console.log("/////");
    //         var user = await User.findById(tokenrData.user);
    //         var userDto = {nickname:user.nickname, id:user._id};
    //
    //         var accessToken_n = jwt.sign({...userDto}, Data.AccessToken, {expiresIn:'40m'});
    //         var refreshToken_n = jwt.sign({...userDto}, Data.RefreshToken, {expiresIn:'30d'});
    //
    //         tokenrData.accessToken = accessToken_n;
    //         tokenrData.refreshToken = refreshToken_n;
    //         await tokenrData.save();
    //
    //         res.cookie('refreshToken',refreshToken_n,{maxAge:30*86400000, httpOnly:true,sameSite:'None', secure:false, partitioned: true});
    //         return {accessToken:accessToken_n, refreshToken: refreshToken_n,id:user._id};
    //     }catch (e) {
    //         return "not found";
    //     }
    // }

}