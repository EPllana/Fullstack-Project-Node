import express from "express";
import { createBooking,getAllBookings,updateBookings,deleteBookings,updateStatus,cancelMyBooking} from "./booking.controller.js";
import { isAuthenticated , authorize} from "../../middlewares/auth.middleware.js";

const router = express.Router();
//mebo getmy bookings endpoint
//mrbo ni booking cancel booking
//updateStatus
//stats me nxjerr satistikat per shitje

router.post("/:tourId", isAuthenticated, createBooking);

router.get("/", isAuthenticated, getAllBookings);

router.put("/:id", isAuthenticated, authorize(["user"]), updateBookings);

// Delete a booking by its ID
router.delete("/:bookingId", isAuthenticated, authorize(["user"]), deleteBookings);

// Update the status of a booking (only for users)
router.put("/updateStatus/:bookingId", isAuthenticated, authorize(["admin","user"]), updateStatus);

// Cancel a booking for the authenticated user
router.put("/cancelMyBooking/:bookingId", isAuthenticated, authorize(["user"]), cancelMyBooking);



export default router;
