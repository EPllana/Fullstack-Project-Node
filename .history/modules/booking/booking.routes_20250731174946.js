import express from "express";
import { createBooking,getAllBookings,updateBookings,deleteBookings} from "./booking.controller.js";
import { isAuthenticated , authorize} from "../../middlewares/auth.middleware.js";

const router = express.Router();
//mebo getmy bookings endpoint
//mrbo ni booking cancel booking
//updateStatus
//stats me nxjerr satistikat per shitje

router.post("/;",isAuthenticated, createBooking)

router.get("/",isAuthenticated, getAllBookings)

router.put("/:id",isAuthenticated,authorize, updateBookings)

router.delete("/:id",isAuthenticated, authorize ,deleteBookings)



export default router;
