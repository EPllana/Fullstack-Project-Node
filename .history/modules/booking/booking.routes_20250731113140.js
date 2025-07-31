import express from "express";
import { createBooking} from "./booking.controller.js";
import { isAuthenticated } from "../../middlewares/auth.middleware.js";

const router = express.Router();


router.post("/",isAuthenticated, createBooking)

router.post("/",isAuthenticated, createBooking)

export default router;
