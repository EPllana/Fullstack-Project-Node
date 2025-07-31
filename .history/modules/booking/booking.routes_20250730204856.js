import express from "express";
import { createBooking} from "./tour.controller.js";
import {createBooking}from "../t"

const router = express.Router();


router.post("/", createBooking)


export default router;
