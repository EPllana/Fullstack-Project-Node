import express from "express";
import { createBooking,getAllBookings,updateBookings,deleteBookings,updateStatus,cancelMyBooking} from "./booking.controller.js";
import { isAuthenticated , authorize} from "../../middlewares/auth.middleware.js";

const router = express.Router();
//mebo getmy bookings endpoint
//mrbo ni booking cancel booking
//updateStatus
//stats me nxjerr satistikat per shitje

// Create a new booking for a specific tour
router.post("/:tourId", isAuthenticated, createBooking);

// Get all bookings for the authenticated user
router.get("/", isAuthenticated, getAllBookings);

// Update a booking by its ID
router.put("/:id", isAuthenticated, authorize(["user"]), updateBookings);

// Delete a booking by its ID
router.delete("/:bookingId", isAuthenticated, authorize(["user"]), deleteBookings);

// Update the status of a booking (only for users)
router.put("/updateStatus/:bookingId", isAuthenticated, authorize(["user"]), updateStatus);

// Cancel a booking for the authenticated user
router.put("/cancelMyBooking/:bookingId", isAuthenticated, authorize(["user"]), cancelMyBooking);



export default router;
