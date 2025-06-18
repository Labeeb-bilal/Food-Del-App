
const {verifyToken} = require('../Service/Auth')

const AuthMiddleware = (req,res,next) => {
    const {token} = req.headers;

    if (!token) {
         return res.json({ success : false , message : 'UnAuthorized! Please Login'});
    } 
    try {
        const payload = verifyToken(token);
        req.user = payload;
        next();
    } catch (error) {
        console.log(error);
        res.json({success: false , message : 'Error'});
    }
    
}

module.exports = {
    AuthMiddleware,
}