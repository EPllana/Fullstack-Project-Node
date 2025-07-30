import express from "express";
import { createTour, getTour, getOneTour, deleteTour, updateTour ,getTourstats,addReview} from "./tour.controller.js";
import upload from "../../config/multer.js";

const router = express.Router();

router.post("/",isAuthenticated, upload.single("image"), createTour);
////====
router.post("/", createTour);
router.get("/", getTour);


router.get("/getTourStats",  getTourstats) // e kemi qit para ktyne me id


router.get("/:id", getOneTour);

router.put("/:id", updateTour);
router.delete("/:id", deleteTour);
router.post("/:tourId/addReview", addReview)





export default router;


