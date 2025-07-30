import express from "express";
import { createUser,getAllUsers,getOneUser,updateUser,deleteUser,changePassword,deleteMe,updateMe } from "../user/user.controller.js";///addReview// e shtojm me import 
import { isAuthenticated, authorize } from "../../middlewares/auth.middleware.js"





const router = express.Router();


//router.get("/");// skena nevoj mebo users se tek  routes.js  e kem t komentune pjesen qe me  i thur userat  // ktu kem mi shti krejt userat nga kontrolleri
router.post("/", createUser)
//router.put("/")
//router.delete("/")
router.get("/", (['admin', 'moderator']), getAllUsers)// next e perdorim se isauthenticated esht nmes per at arsye authorize ebojm array mju jep qasje adminit dhe moderatorit
router.get("/:id", isAuthenticated, authorize(['admin', 'moderator']), getOneUser);// me bo get me ne shpi n ven t id me bo nven req.params ,id mebo req.user.id per me pa profilin ton me get me 
router.put("/:id",isAuthenticated,authorize(['admin', 'moderator']), updateUser) // mundemi me shtu update me me bo update veq veten selojm kurgju prej frontit req.user._id veq vettit mebo update  TEK UPDATE ME duhet mebo 
router.put("/updateMe",isAuthenticated,authorize(['admin', 'moderator',"user"]), updateMe);
router.delete("/:id", isAuthenticated,authorize(['admin', 'moderator']),isAuthenticated, deleteUser);// edhe ktu muedmi mebo dekativate me me fhsi veten authorize melan veq user  ose 3t 
router.delete("/deleteMe", isAuthenticated,authorize(['admin', 'moderator']),isAuthenticated, deleteMe);

router.put("/changepassword",isAuthenticated,authorize(['admin', 'moderator','user']), changePassword);// kta e ndrrojm prej id skemi nevoj se e kemi otkenint 

export default router;  // ktu  o errori per oren e artdhshme me rregullu importin 