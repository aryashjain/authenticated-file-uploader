import { Router } from "express";
import  {handleSignUp, handleLogin} from "../controllers/user.controller.js"
const userRoute = Router();

// login and signup

userRoute.post('/signUp', handleSignUp);
userRoute.post('/logIn', handleLogin);


export {userRoute};