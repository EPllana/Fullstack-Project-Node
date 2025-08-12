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

    if (!startDate || !endDate) {
      return res.status(400).json({ message: "Start date and end date are required" });
    }

    const startDateOnly = new Date(startDate.split("T")[0]);
    const endDateOnly = new Date(endDate.split("T")[0]);

    const tour = await Tour.findById(tourId);
    if (!tour) {
      return res.status(404).json({ message: "Tour not found" });
    }

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
      message: "Booking created successfully",
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
    }

    const status = req.query.status;  
    if (status) {
      filter.status = status;
    }

    if (search)  {
      filter.$or = [
        { 'tour.title': { $regex: search, $options: 'i' } },
        { 'tour.description': { $regex: search, $options: 'i' } },
      ];
    }

    const bookings = await Booking.find(filter)
      .populate('tour', 'title price description')
      .populate('user', 'name email')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

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


export const updateStatus = async (req, res) => {
  try {
    const bookingId = req.params.bookingId;
    const status = req.body.status;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (status && (status === "paid" || status === "canceled" || status === "completed")) {
      booking.status = status;
    } else {
      return res.status(400).json({ message: "Invalid status" }); 
    }
    await booking.save();

    return res.status(200).json({ message: "Status updated successfully" });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};



export const cancelMyBooking = async (req ,res)=>{
  try{
    const bookingId = req.params.BookingId;
    const status = req.body.status;
    const booking = await Booking.findOne({_id:bookingId,user:req.user._id})
    if(!booking){
      return res.status(404).json({ message: "Tour not found" });
    }
    if(status && status === "canceled"){
      booking.status=status;
    }else{
      res.status(400).json({message:"Status is required"})
    }
    await booking.save();
    res.status(201).json({ message: "Status updated" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};



export const  getbookingStats = async (req,res)=>{
  try{
   const totalBookings = await Booking.countDocuments({isActive:true})
   const paidBookings = await Booking.countDocuments({isActive:true, status:"paid"});// i numron vetem ato qekan statusin paid
   const pendingBookings = await Booking.countDocuments({isActive:true, status:"pending"});
   const cancelBookings = await Booking.countDocuments({isActive:true, status:"cancel"});
// prej krejt bookings sa ka fitu qe eka statusin paid

//aggregate kur deshirojm me bo grupime 
const revenueResults = await Booking.aggregate([{$match:{isActive:true,status:"paid"}},
{$group:{_id:null,totalRevenue:{$sum:"$totalPrice"} }}//ktu me mbledh totalprice
  ])//aggregate kthen array posht e bojm nje check qe me kthy ne 0 mos me fail 
const totalRevenue = revenueResults.length > 0 ? revenueResults[0].totalRevenue:0;  // nse e om a e madhe se - ekthy ket  pse 0 tek null e kemi bo null not paid perderisa e kemi t grupune e kthen vetem nje array sjema tu perdor grupe nbazz field veq 1 nese o ma ed madhe se 0 me kthy total revenue  


//me zgjedh nr t komplet guests qe kan bo applikacionoin ton totalguests
const guestsResults = await Booking.aggregate([{$match:{isActive:true}},
{$group:{_id:null},totalGuests:{$sum:"$guests"}}]) // ekemi marr $guest per fielden tek guests ne model tek schema 
const totalGuests = guestsResults.length > 0 ? guestsResults[0].totalGuests : 0 // nese ska e kthejm 0 


//averageprice
 const averagePriceResults = booking.aggregate([{$match:{isActive:true}}])

  }catch(error){

  }
}