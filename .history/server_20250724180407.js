import  express  from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDatabase from "./config/database.js";
import apiRoutes from "./routes/routes.js";

dotenv.config();// e lexon dotenv 
//process.env.port // PER ME LEXU psh 

const app = express();

app.use(express.json());


app.use(cors());// e lojm yllin mi jep qasje krejt 

app.use("/api", apiRoutes);// e kemi lidh me routes.js



app.get("/api/health", (req, res)=>{//endpoint qe o tu funksionu
    res.json({
        status:"OK",
        timestamp:new Date().toISOString(),
    })
}) 
// portin ne env  per me lexu 



const PORT = process.env.PORT;

const createServer = async () => {
    try {
      await connectDatabase();
      console.log("Lidhja me databazën u krye me sukses.");
      app.listen(PORT, () => {
        console.log(`Serveri punon në portin ${PORT}`);
      });
    } catch (error) {
      console.error(" Gabim gjatë nisjes së serverit:", error);
    }
  };
  
  createServer();


