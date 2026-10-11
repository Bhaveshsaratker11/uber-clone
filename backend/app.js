import express from "express";
import cors from "cors";
import dbConnect from "./db/db.js";
import router from "./routes/userRoute.js"
import dotenv from "dotenv";
dotenv.config();
dbConnect();


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));


app.get("/",(req,res)=>{
    res.send("hii i am live")
});

app.use("/api/user", router);

export default app;
