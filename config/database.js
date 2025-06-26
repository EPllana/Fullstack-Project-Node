import mongoose  from "mongoose";
//e lrijojm connect dtb pastaj e thirrim server

const connectDatabase = async ()=>{// e thirrim me async se se bllokon ekzekutimin pret  pershkak qe connectimi me dtb merr pak koh
    // ebojm try cathch se mos po deshton njs 
try{//connectionString kena meru n env  PASTAJ Shskojm ne mongodb e shenojm MONGODB_URI
    const connectionString = process.env.MONGODB_URI
    const connection = await mongoose.connect(connectionString);
    console.log("Mongo db u konektua me suksess")
}catch(error){
    console.error("Lidhja me Mongodb DESHTOI ");
    console.error(error.message)// e kthem kta mena kllzu qeka deshtu
    process.exit(1);// nese diqka ka shku gabim me shym serverin shutdown
}
}
export default connectDatabase;