import express from "express";
import { createUser,getAllUsers,getOneUser,updateUser,deleteUser,changePassword, } from "../user/user.controller.js";///addReview// e shtojm me import 
import { isAuthenticated,  } from "../../middlewares/auth.middleware.js"





const router = express.Router();


//router.get("/");// skena nevoj mebo users se tek  routes.js  e kem t komentune pjesen qe me  i thur userat  // ktu kem mi shti krejt userat nga kontrolleri
router.post("/", createUser)
//router.put("/")
//router.delete("/")
router.get("/", isAuthenticated , authorize, getAllUsers)// next e perdorim se isauthenticated esht nmes per at arsye
router.get("/:id",isAuthenticated,  getOneUser),
router.put("/:id",isAuthenticated, updateUser)
router.delete("/:id", isAuthenticated, deleteUser);
router.put("/:id/changepassword",isAuthenticated, changePassword);

export default router;  // ktu  o errori per oren e artdhshme me rregullu importin 