import express from "express";
import { appendFile } from "fs";
import {login}fr

const router = express.Router();


router.post("/login", login)

export default router
