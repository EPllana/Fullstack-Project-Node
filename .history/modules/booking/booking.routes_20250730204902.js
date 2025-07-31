import express from "express";
import { createBooking} from "./boo.controller.js";
import {createBooking}from "../"

const router = express.Router();


router.post("/", createBooking)


export default router;
