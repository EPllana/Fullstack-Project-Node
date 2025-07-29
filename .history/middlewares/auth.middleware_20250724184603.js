import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


const secretKey = process.env.SECRET_KEY

export const isAuthenticated = async (req ,res ,next){
    const authHeader = req.headers.authorization;
    if(!)
}