// user qe eka bo booking 
//cilin tour eka bo book  ktu hin tourId
//per sa vet eka rezervu guests me shku tetour mepat qimiin sa ka pas dhe me bo * nr i guests per me i ardh shuma e fundit psh per 4 vet sa $ juka bo 
// data me cilen dat eka rezervu 
//data e krijimit data e perditsiimt  datat qe jon bo update 
// mebo update me  dhe get me tek routes e userit \\
import mongoose from "mongoose";

const bookingSchema = new mongoose.schema({
    user:{
        type:mongoose.Schema.Type.ObjectId,
        ref:"user",
        required:true
    },
    date:{
        type:String,
        required:true
    }

},{timestamps:true})