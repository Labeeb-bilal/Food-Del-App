const JWT = require('jsonwebtoken');
const secretkey = 's1uper@123'  // stires in env file


const createTokenForUser = (user) => {
   const Payload = {
     id: user._id,
     name : user.name,
     email : user.email,
   }
   console.log('JWT_SECRET',process.env.JWT_SECRET)
   const token = JWT.sign(Payload,process.env.JWT_SECRET);
   return token;
}

const verifyToken = (token) => {
  const Payload = JWT.verify(token,process.env.JWT_SECRET);
  return Payload;
}

module.exports = {
    createTokenForUser,
    verifyToken,
}