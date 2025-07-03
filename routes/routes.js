import express from "express";
import userRoutes from"../modules/user/user.routes.js";

const router = express.Router();


//router.use("users". userRoutes) // kjo esht pjesa e komentune
router.use("/users", userRoutes)// ktu e merr prefiksin users kurse api e ka ne server ktu e merr users 

export default router;
