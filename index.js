import express from "express";
import cors from "cors";
import dotenv from "dotenv"

import { upload } from "./multer/multer.middleware.js";
import { connectDB } from "./db-connection/index.js";

dotenv.config({
    path: './.env'
})


const app = express()
app.use(cors())
app.use(express.json())



import {userRoute} from "./routes/user.route.js"


app.use("/user",userRoute);
app.post("/upload", upload.single('file'), (req, resp) => {
    console.log(req.body)
    resp.send("file upload")

});


const PORT = process.env.PORT || 8938

connectDB()
.then(() => {
    app.listen(PORT || 8000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})


