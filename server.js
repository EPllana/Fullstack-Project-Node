import  express  from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDatabase from "./config/database.js";
import apiRoutes from "./routes/routes.js";

dotenv.config();// e lexon dotenv 
//process.env.port // PER ME LEXU psh 

const app = express();

app.use(express.json());



app.use("/api", apiRoutes);// e kemi lidh me routes.js


app.use(cors("*"));// e lojm yllin mi jep qasje krejt 
app.use(express.json())// mibo pasrse datata qe vin prej request 
app.get("/api/health", (req, res)=>{//endpoint qe o tu funksionu
    res.json({
        status:"OK",
        timestamp:new Date().toISOString(),
    })
}) 
// portin ne env  per me lexu 



const PORT = process.env.PORT;

const startServer = async() =>{// async se mrr koh me u lexu qata e lejon mu ekzekutu pjest tjera se kjo mundet memarr koh a await pret deri t ekezekutohet blloku i ti 

    try{// ktu e thirrim mongo db permi app.listen nuk starton nese nuk connektohet me mongodb anej funksionon ekem async knej e bojm me await
       await  connectDatabase();
        app.listen(PORT,()=>{
            console.log(`Serveri u startu me suksess on http://localhost:${PORT}`);
        })

    }catch(error){
        console.error("Serveri deshtoi",error.message);
        process.exit(1);// kur ndodh naj gabim apo diqka e shut down kompelt o mir me perdor se kur te sulmon dikush projektin a databasen  e bon shut down
    }
};

startServer();


