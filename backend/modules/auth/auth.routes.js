import express from "express";
import { appendFile } from "fs";
import {login}from "./auth.controller.js"

const router = express.Router();


router.post("/login", login)

export default router
