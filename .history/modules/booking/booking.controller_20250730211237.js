import dotenv from "dotenv";
import Booking from "./booking.model.js"
dotenv.config();


export const createBooking = async (req, res)=>{
    try{
        const { tourId, guests, bookingDate,  } = req.body;
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

          const totalPrice = guests * tour.pricePerPerson;

          const newBooking = new Booking({
            user,
            tour:tour._id,
            guests,
            totalPrice,
            bookingDate: new Date(bookingDate),
            createdBy:user,
            status:"Pending"
          })
          await newBooking.save();

          res.status(201).json({  message: "Booking created successfully!", booking: newBooking, });
          
          

    }catch(error){
        console.error(error);
        res.status(500).json({message: "Error creating booking",error: error.message,});
    }
}
