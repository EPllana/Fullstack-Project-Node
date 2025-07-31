import dotenv from "dotenv";
dotenv.config();
import Booking from "./booking.model.js"
import Tour from "../tour/tour.model.js"


export const createBooking = async (req, res) => {
  try {
    const { tourId, guests } = req.body;
    const userId = req.user.id;  

 
    const tour = await Tour.findById(tourId);
    if (!tour) {
      return res.status(404).json({ message: "Tour not found" });
    }

    
    const totalPrice = tour.price * guests;  

    
    const newBooking = new Booking({
      user: userId,
      tour: tourId,
      guests: guests,
      totalPrice: totalPrice,
      bookingDate: new Date(),
    });


    await newBooking.save();

    res.status(201).json({ message: "Booking created successfully", booking: newBooking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

