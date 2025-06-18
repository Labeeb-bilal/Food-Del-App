const JWT = require('jsonwebtoken');
const secretkey = 'super@123'


const createTokenForUser = (user) => {
   const Payload = {
     id: user._id,
     name : user.name,
     email : user.email,
   }
   const token = JWT.sign(Payload,secretkey);
   return token;
}

const verifyToken = (token) => {
  const Payload = JWT.verify(token,secretkey);
  return Payload;
}

module.exports = {
    createTokenForUser,
    verifyToken,
}