// user qe eka bo booking 
//cilin tour eka bo book  ktu hin tourId
//per sa vet eka rezervu guests me shku tetour mepat qimiin sa ka pas dhe me bo * nr i guests per me i ardh shuma e fundit psh per 4 vet sa $ juka bo 
// data me cilen dat eka rezervu 
//data e krijimit data e perditsiimt  datat qe jon bo update 
// mebo update me  dhe get me tek routes e userit \\
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    tour:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Tour",
        required: true
    },
    guests:{
        type:Number,
        required:true,
        min:1 // smundet mepat ma pak se 1 guest
    },
    totalPrice:{
        type:Number,
        required:true,
        min:0
    },
    bookingDate:{
        type:Date,
        required:true
    },
    isActive:{
        type:Boolean,
        default:true
    },
    status: {
        type: String,
        enum: ["pending", "confirmed", "completed", "canceled"],
        default: "pending",  
    },


},{timestamps:true})

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;





const bookSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    tour:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Tour",
        required:true
    },
    guests:{
        type:Number,
        required:true,
        min:1
    }
})