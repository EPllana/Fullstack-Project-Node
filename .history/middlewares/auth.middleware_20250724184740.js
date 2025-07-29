import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


const secretKey = process.env.SECRET_KEY

export const isAuthenticated = async (req ,res ,next){
    const authHeader = req.headers.authorization;
    if(!authHeader){return res.status(401).json({message:"acces denied no token provided"})}// statusi 401 perdoret kur munon emri mmbiermri email a njs 
    cosnt token = authHeader 
}