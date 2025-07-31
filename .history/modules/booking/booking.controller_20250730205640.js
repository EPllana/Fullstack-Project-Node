
import express  from "express";
import dotenv from "dotenv";
import Booking from "./booking.model.js"
dotenv.config();


export const createBooking = async (req, res)=>{
    try{
        const { tourId, guests, bookingDate } = req.body;
        const user = req.user._id;

        if (!tourId || !guests || !bookingDate) {
            return res.status(400).json({ message: "All fields are required!" });
          }

    }
}
