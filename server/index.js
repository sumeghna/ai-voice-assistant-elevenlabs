import express from "express";
import axios from "axios";
import cors from "cors";
const app=express();
app.use(cors());
app.use(express.json());

app.post("/voice",async(req,res)=>{
    const text=req.body.text

    res.json({ 
        message: "voice endpoint working",
        input: text
    })
})


app.listen(5000,()=>{
    console.log("Server running")
})