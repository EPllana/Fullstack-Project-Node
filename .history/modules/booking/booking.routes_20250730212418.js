import express from "express";
import { createBooking} from "./booking.controller.js";
import { isAuthenticated, authorize } from "../../middlewares/auth.middleware.js";

const router = express.Router();


router.post("/",isAuthenticated, authorize(['admin', 'moderator']), createBooking)


export default router;
