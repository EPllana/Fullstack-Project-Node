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
    const userId = req.user._id; 
    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 10; 

    const skip = (page - 1) * limit;

    let filter = { user: userId, isActive: true }; 

    // Kontrollo nëse ka një search të dhënë
    if (req.query.search) {
      const searchTerm = req.query.search;
      filter.$or = [
        { 'tour.title': { $regex: searchTerm, $options: 'i' } },  // Filtrimi për titullin e turit
        { 'tour.description': { $regex: searchTerm, $options: 'i' } },  // Filtrimi për përshkrimin e turit
      ];
    }

    // Merr të gjitha rezervimet duke përdorur paginimin dhe filtrimin
    const bookings = await Booking.find(filter)
      .populate('tour', 'title price description')  // Merr informacionin e turit
      .populate('user', 'name email')  // Merr informacionin e përdoruesit (nëse është e nevojshme)
      .skip(skip) // Paginimi: Skip për të kaluar sa faqe
      .limit(limit) // Paginimi: Limito për sa rezervime në faqe
      .sort({ bookingDate: -1 });  // Mund të shtosh renditje nga data më e fundit (opsionale)

    if (bookings.length === 0) {
      return res.status(404).json({ message: "No bookings found" });
    }

    // Gjej numrin total të rezervimeve që përputhen me filtrat për paginim
    const totalBookings = await Booking.countDocuments(filter);

    res.status(200).json({
      bookings,
      totalBookings,  // Total rezervimet që përputhen me kërkesën
      totalPages: Math.ceil(totalBookings / limit),  // Llogarit numrin e faqeve të mundshme
      currentPage: page,  // Tregon në cilën faqe jemi
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

