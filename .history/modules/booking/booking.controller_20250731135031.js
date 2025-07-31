import dotenv from "dotenv";
dotenv.config();
import Booking from "./booking.model.js"
import Tour from "../tour/tour.model.js"

////==============================================================================createBooking=====================================================================================================

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


////==============================================================================getAllBookings=====================================================================================================
export const getAllBookings = async (req, res) => {
  try {
    const userId = req.user._id; 
    const search = req.query.search;
    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 10; 

    const skip = (page - 1) * limit;

    let filter = { user: userId, isActive: true }; 


    if (search)  {
      filter.$or = [
        { 'tour.title': { $regex: search, $options: 'i' } },
        { 'tour.description': { $regex: search, $options: 'i' } },
      ];
    }

    const bookings = await Booking.find(filter).populate('tour', 'title price description').populate('user', 'name email') .skip(skip).limit(limit).sort({ bookingDate: -1 }); 

    if (bookings.length === 0) {
      return res.status(404).json({ message: "No bookings found" });
    }

    const totalBookings = await Booking.countDocuments(filter);

    res.status(200).json({
      bookings,
      totalBookings,  
      currentPage: page,  
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


export const getAllBookings = async (req, res)=>{
  try{
    const userId=req.user._id;
    const search = req.query.search;
    const limit = parseInt(req.query.limit);
    const page = parseInt(req.query.page);

    const skip = (page -1 )* limit

    let filter = {user:userId, isActive:true}
    
  }
}

////==============================================================================updateBookings=====================================================================================================

export const updateBookings = async(req,res)=>{
  try{

  
  const bookingId= req.params.id
  const {guests,status} = req.body

  const booking = await Booking.findById(bookingId)

  if(!booking){
     return res.status(404).json({ message: "Booking not found" });
    }

    if (guests) {
      const tour = await Tour.findById(booking.tour);
      
      if (!tour) {
        return res.status(404).json({ message: "Tour not found" });
      }
    
      booking.guests = guests;
      booking.totalPrice = tour.price * guests; 
    }
    
    if (status) { booking.status = status; }
    
    await booking.save();

    res.status(200).json({
      message: "Booking updated successfully",
      booking
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


////==============================================================================deleteBookings=====================================================================================================
export const deleteBookings = async(req, res)=>{
  try{
    const bookingId = req.params.id;

    const booking = await Booking.findByIdAndDelete(bookingId)
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
