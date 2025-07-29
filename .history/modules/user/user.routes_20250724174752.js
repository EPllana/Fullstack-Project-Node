import express from "express";
import { createUser,getAllUsers,getOneUser,updateUser,deleteUser,changePassword,/ } from "../user/user.controller.js";




const router = express.Router();


//router.get("/");// skena nevoj mebo users se tek  routes.js  e kem t komentune pjesen qe me  i thur userat  // ktu kem mi shti krejt userat nga kontrolleri
router.post("/", createUser)
//router.put("/")
//router.delete("/")
router.get("/", getAllUsers),
router.get("/:id", getOneUser),
router.put("/:id", updateUser)
router.delete("/:id", deleteUser);
router.put("/:id/changepassword", changePassword);

export default router;