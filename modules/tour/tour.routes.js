import express from "express";
import { createTour,getTour,getOneTour,deleteTour } from "./tour.controller.js";

const router = express();

router.post("/", createTour);
router.get("/", getTour);
router.get("/:id", getOneTour),
//router.put("/:id", updateTour);
router.delete("/:id". deleteTour)

export default router;