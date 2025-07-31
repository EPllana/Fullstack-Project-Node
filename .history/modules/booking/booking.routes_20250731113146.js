import express from "express";
import { createBooking,getAllBookings} from "./booking.controller.js";
import { isAuthenticated } from "../../middlewares/auth.middleware.js";

const router = express.Router();


router.post("/",isAuthenticated, createBooking)

router.post("/",isAuthenticated, getAllBookings)

export default router;
