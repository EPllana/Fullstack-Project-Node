import express from "express";
import { createBooking,getAllBookings,updateBookings,deleteBookings,updateStatus,cancelMyBooking,bookingStats} from "./booking.controller.js";
import { isAuthenticated , authorize} from "../../middlewares/auth.middleware.js";

const router = express.Router();
//mebo getmy bookings endpoint
//mrbo ni booking cancel booking
//updateStatus
//stats me nxjerr satistikat per shitje

router.post("/:tourId", isAuthenticated, createBooking);

router.get("/", isAuthenticated, getAllBookings);

router.put("/:id", isAuthenticated, authorize(["user"]), updateBookings);

router.delete("/:bookingId", isAuthenticated, authorize(["user"]), deleteBookings);

router.put("/updateStatus/:bookingId", isAuthenticated, authorize(["admin","user"]), updateStatus);

router.put("/cancelMyBooking/:bookingId", isAuthenticated, authorize(["user"]), cancelMyBooking);


router.get("/bookingStats", isAuthenticated,authorize(["admin","moderator"]), getbookingStats)
export default router;
