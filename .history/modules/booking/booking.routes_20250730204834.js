import express from "express";
import { createTour, getTour, getOneTour, deleteTour, updateTour ,getTourstats,addReview} from "./tour.controller.js";

const router = express.Router();


router.post("/", createBooking)


export default router;
