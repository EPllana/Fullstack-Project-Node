import  express  from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDatabase from "./config/database.js";
import apiRoutes from "./routes/routes.js";
import {fileURLToPath} from "url";
import path from "path";

dotenv.config();// e lexon dotenv 
//process.env.port // PER ME LEXU psh 

const app = express();

app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(cors("*"));// e lojm yllin mi jep qasje krejt 

app.use("/upload", express.static(path.join(__dirname, "upload")));

app.use("/api", apiRoutes);// e kemi lidh me routes.js


app.use(express.json())// mlexon JSON body

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


