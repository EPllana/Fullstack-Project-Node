import dotenv from "dotenv";
dotenv.config();
import Booking from "./booking.model.js"
import Tour from "../tour/tour.model.js"



export const createBooking = async (req, res)=>{
    try{
        const { tourId, guests, bookingDate, status, } = req.body;
        const user = req.user._id;

        if (!tourId || !guests || !bookingDate) {
            return res.status(400).json({ message: "All fields are required!" });
          }
        
          if (!user) {
            return res.status(401).json({ message: 'You Are Not Authorized.' });
          }

          const tour = await Tour.findById(tourId);
          if (!tour) {
            return res.status(404).json({ message: "Tour not found!" });
          }

          
          const price = pricePerPerson || tour.pricePerPerson;

            if (isNaN(price) || price <= 0) {
            return res.status(400).json({ message: "Invalid price for the tour." });
            }

            const guestCount = Number(guests);
            if (isNaN(guestCount) || guestCount <= 0) {
            return res.status(400).json({ message: "Invalid number of guests." });
            }

          const totalPrice = guests * tour.pricePerPerson;

          const newBooking = new Booking({
            user,
            tour:tour._id,
            guests:guestCount,
            totalPrice,
            bookingDate: new Date(bookingDate),
            status: status || "pending" 
          })
          await newBooking.save();

          res.status(201).json({  message: "Booking created successfully!", booking: newBooking, });
          
          

    }catch(error){
        console.error(error);
        res.status(500).json({message: "Error creating booking",error: error.message,});
    }
}
