import express from "express";
import { createBooking,getAllBookings,updateBookings} from "./booking.controller.js";
import { isAuthenticated } from "../../middlewares/auth.middleware.js";

const router = express.Router();


router.post("/",isAuthenticated, createBooking)

router.get("/",isAuthenticated, getAllBookings)

router.put("/:id",isAuthenticated, updateBookings)

router.delete("/:id",isAuthenticated, updateBookings)



export default router;
