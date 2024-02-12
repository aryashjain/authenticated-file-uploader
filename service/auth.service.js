import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
const secret = "kacnkjsnckjnsdkcns"

function setUser( user) {
   const payload = {
    _id: user._id,
    email: user.email,
   };
   return jwt.sign(payload, secret);
}

function getUser(token) {
    if(!token) return null;
    try{
   return jwt.verify(token, secret);   
    } catch(err){
        console.log("INVALID JWT --> INVALID USER")
    }

}

export {
    setUser, getUser
}