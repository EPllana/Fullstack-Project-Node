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

export const getAllBookings = async (req, res) => {
  try {
    const userId = req.user.id;  
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);


    

    // Merr të gjitha rezervimet e përdoruesit nga baza e të dhënave
    const bookings = await Booking.find({ user: userId })
      .populate('tour', 'title price description')  // Merr informacionin e turit
      .populate('user', 'name email')  // Merr informacionin e përdoruesit (nëse është e nevojshme)
      .sort({ bookingDate: -1 });  // Mund të shtosh renditje nga data më e fundit (opsionale)

    if (bookings.length === 0) {
      return res.status(404).json({ message: "No bookings found" });
    }

    res.status(200).json(bookings);  // Kthej të gjitha rezervimet në response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

