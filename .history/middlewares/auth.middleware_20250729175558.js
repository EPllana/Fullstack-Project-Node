import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import User from "../modules/user/user.model.js"


const secretKey = process.env.SECRET_KEY

export const isAuthenticated = async (req ,res ,next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader){return res.status(401).json({message:"acces denied no token provided"})}// statusi 401 perdoret kur munon emri mmbiermri email a njs 


     try{
    const token = authHeader.split(" ")[1] //split i largon hapsirat ne token  itemit 1  e bojna 1 se token esht split ktjhen strign ne array  e krijon array me fjal  apo me itemat qe i ka   mbase kemi hapsir dhe ne se kemi presje ktu e vendosim presjen (" , ") tokeni esht 0 sepse array pastaj adadada esht 1
    const decode  = jwt.verify(token, secretKey)//split string e ndan ne array 0 item i par 1 item i dyt tokeni decode user id edhe roli  e kem bo req.user mju aksesu kti useri saher e shtim ne payload req.user na kthet id edhe roli
    const user = await User.findById(decode.id)
    req.user=user; 
    next();
     }catch(error){
        res.status(401).json({message:"Token Expired"})

     } 

};
//ktu e vendosim cilat role kaan me kan 
export const authorize = (roles)=> {
   return(req, res, next)=>{
      if(!req.user){
         return res.status(404).json({message:"User doesnt exist"})
      }
   }
}