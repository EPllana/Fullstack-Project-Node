import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


const secretKey = process.env.SECRET_KEY

export const isAuthenticated = async (req ,res ,next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader){return res.status(401).json({message:"acces denied no token provided"})}// statusi 401 perdoret kur munon emri mmbiermri email a njs 

    const token = authHeader.split(" ")[1] //split i largon hapsirat ne token  itemit 1  e bojna 1 se token esht split ktjhen strign ne array  e krijon array me fjal  apo me itemat qe i ka   mbase kemi hapsir dhe ne se kemi presje ktu e vendosim presjen (" , ") tokeni esht 0 sepse array pastaj adadada esht 1
   const decoded  = jwt.verify(token, secretKe)
}