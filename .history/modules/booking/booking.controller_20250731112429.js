import dotenv from "dotenv";
dotenv.config();
import Booking from "./booking.model.js"
import Tour from "../tour/tour.model.js"


export const createBooking = async (req, res) => {
  try {
    const { tourId, guests } = req.body;
    const userId = req.user._id;  

 
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

export const getBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    
    // Gjejmë rezervimin përkatës
    const booking = await Booking.findById(bookingId)
      .populate('user', 'name email')  // Popullon informacionin e përdoruesit
      .populate('tour', 'title price'); // Popullon informacionin e turit

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
