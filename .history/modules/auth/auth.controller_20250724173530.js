import dotenv from "dotenv";
dotenv.config();
import express from "express";
import User from "./user.model.js";


export const login = async (req, res)=>{
    try{
        const{email,password}=req.body
        const user = await User.findOne({email});
        if(!user){

        }
    }
}