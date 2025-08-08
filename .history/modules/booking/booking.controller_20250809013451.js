import dotenv from "dotenv";
dotenv.config();
import Booking from "./booking.model.js"
import Tour from "../tour/tour.model.js"

////==============================================================================createBooking=====================================================================================================

export const createBooking = async (req, res) => {
  try {
    const tourId = req.params.tourId;
    const userId = req.user._id;
    const { guests, startDate, endDate } = req.body;
    const tour = await Tour.findById(tourId);
    if (!tour) {
      return res.status(404).json({ messae: "Tour not found" });
    }
    const startDateOnly = new Date(startDate.split("T")[0]);
    const endDateOnly = new Date(endDate.split("T")[0]);

    const diffTime = endDateOnly - startDateOnly;
    const diffDays = diffTime / (1000 * 60 * 60 * 24) + 1;

    const totalPrice = tour.price * guests * diffDays;
    const booking = new Booking({
      user: userId,
      tour: tourId,
      guests,
      totalPrice,
      startDate,
      endDate,
    });
    await booking.save();
    res.status(201).json({
      message: "booking created successfully",
    });
  } catch (error) {
    console.log(error, "error");
    res.status(500).json({ message: "Server Error", error });
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

    if (req.user.role === "user") {
      filter.user = req.user._id;
      // { isActive: true, user: req.user._id}
    }

    if (status) {
      filter.status = status;
    }
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


export const updateStatus = async (req, res)=>{
  try{
    const bookingId = req.params.bookingId;
    const status = req.body.status;
    const booking = await Booking.findById(bookingId)
    if (!booking) {
      return res.status(404).json({ message: "Tour not found" });
    }
    if(status && (status ==="paid" || status ==="canceled")){
    }else{
      res.status(400).json({message:"Status is required"});
    }
    await Booking.save();
    res.status(201).json({message:Status Updated})
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const cancelMyBooking = async 