import express from "express";
import userRoutes from"../modules/user/user.routes.js";
import tourRoutes from"../modules/tour/tour.routes.js"
import authRoutes from "../modules/auth/auth.routes"

const router = express.Router();


//router.use("users". userRoutes) // kjo esht pjesa e komentune
router.use("/users", userRoutes)// ktu e merr prefiksin users kurse api e ka ne server ktu e merr users 
router.use("/tours", tourRoutes);
router.use("auth", authRoutes)

export default router;
