import express from "express";
import { createTour, getTour, getOneTour, deleteTour, updateTour ,getTourstats,addReview} from "./tour.controller.js";
import upload from "../../config/multer.js";
import {isAuthenticated, authorize} from"../../middlewares/auth.middleware.js"

const router = express.Router();

router.post("/",isAuthenticated,authorize(['admin', 'moderator']), upload.single("image"), createTour);
////====
router.post("/", createTour);
router.get("/", getTour);


router.get("/getTourStats",  getTourstats) // e kemi qit para ktyne me id


router.get("/:id", getOneTour);

router.put("/:id",isAuthenticated, authorize(['admin', 'moderator']),updateTour);
router.delete("/:id", isAuthenticated,authorize(['admin']), deleteTour);
router.post("/:tourId/addReview",isAuthenticated,authorize(['admin', 'moderator','user']), addReview)





export default router;


