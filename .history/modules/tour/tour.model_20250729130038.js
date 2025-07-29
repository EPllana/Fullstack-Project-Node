import mongoose from "mongoose";

const reviewScehma = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  comment: { type: String },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
});

const tourSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    location: { type: String },
    country: { type: String, required: true },
    city: { type: String, required: true },
    price: { type: Number, required: true },
    averageReating: { type: Number, default: 0 },
    image: { type: String },
    reviews: [revieScehma],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const Tour = mongoose.model("Tour", tourSchema);

export default Tour;


/*
import mongoose from "mongoose";


const reviewSchema = new mongoose.Schema({

  user: { // e referojm tek useri 
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  comment:{
    type:String,
  },
  rating:{
    type:Number,
    min:1,
    max:5,
    required:true
  }
  

})

const tourSchema = new mongoose.Schema(
  {
    title: { 
        type: String, 
        required: true },

    description: { 
        type: String },

    location: { 
        type: String },

    country: { 
        type: String, 
        required: true },

    city: { type: String, 
        
        required: true },
    price: { type: Number, 
        required: true },

    averageReating: { 
        type: Number, 
        default: 0 },


        //ktu i shtojm skemen e reviews
        reviews: [reviewSchema],   


    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isActive:{
        type:Boolean,
        default:true
    }
  },
  {
    timestamps: true,
  }
);

const Tour = mongoose.model("Tour", tourSchema);

export default Tour;

// revies po i shtim n tours 


*/