import dotenv from "dotenv";
dotenv.config();
import express from "express";
import User from "../user/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"


const secretKey = process.env.SECRET_KEY
export const login = async (req, res)=>{
    try{
        const{email,password}=req.body
        const user = await User.findOne({email});

        if(!user){
          return  res.status(401).json({message:"Invalid  credencials"}) // 401 perdoret kur kredicialet jan gabim 
        }
        console.log([password, "password"])
        console.log(user.password, "hash password");// mja marr veq pasin

        const isMatch  = await bcrypt.compare(password, user.password);
        if(!isMatch){
          return res.status(401).json({message:"Wrong Password"})
        }
        const payload = {
          id:user._id,
          role:user.role
        }
        const token =jwt.sign(payload, secretKey, {expiresIn:"1h"})
        res.status(200).json({token})
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
      }
}