import express from "express";
import { createBooking,getAllBookings,updateBookings,deleteBookings} from "./booking.controller.js";
import { isAuthenticated } from "../../middlewares/auth.middleware.js";

const router = express.Router();
//mebo getmy bookings endpoint
//mrbo ni booking cancel booking


router.post("/",isAuthenticated, createBooking)

router.get("/",isAuthenticated, getAllBookings)

router.put("/:id",isAuthenticated, updateBookings)

router.delete("/:id",isAuthenticated, deleteBookings)



export default router;
