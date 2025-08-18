import express from "express";
import { createUser,getAllUsers,getOneUser,updateUser,deleteUser,changePassword,deleteMe,updateMe,getMe ,verifyEmail} from "../user/user.controller.js";///addReview// e shtojm me import 
import { isAuthenticated, authorize } from "../../middlewares/auth.middleware.js"





const router = express.Router();


//router.get("/");// skena nevoj mebo users se tek  routes.js  e kem t komentune pjesen qe me  i thur userat  // ktu kem mi shti krejt userat nga kontrolleri
router.post("/", createUser)
//router.put("/")
//router.delete("/")
router.get("/", isAuthenticated , authorize(['admin', 'moderator']), getAllUsers)// next e perdorim se isauthenticated esht nmes per at arsye authorize ebojm array mju jep qasje adminit dhe moderatorit
router.get("/getMe", isAuthenticated, authorize(['admin', 'moderator','user']), getMe);
router.get("/:id", isAuthenticated, authorize(['admin', 'moderator']), getOneUser);// me bo get me ne shpi n ven t id me bo nven req.params ,id mebo req.user.id per me pa profilin ton me get me 

router.put("/updateMe",isAuthenticated,authorize(['admin', 'moderator',"user"]), updateMe);
router.put("/:id",isAuthenticated,authorize(['admin', 'moderator',]), updateUser) // mundemi me shtu update me me bo update veq veten selojm kurgju prej frontit req.user._id veq vettit mebo update  TEK UPDATE ME duhet mebo 


router.delete("/deleteMe", isAuthenticated,authorize(['admin', 'moderator']),isAuthenticated, deleteMe);
router.delete("/:id", isAuthenticated,authorize(['admin', 'moderator']),isAuthenticated, deleteUser);// edhe ktu muedmi mebo dekativate me me fhsi veten authorize melan veq user  ose 3t 

router.put("/changepassword",isAuthenticated,authorize(['admin', 'moderator','user']), changePassword);// kta e ndrrojm prej id skemi nevoj se e kemi otkenint 


router.get("/verify-email" = async (req, res) => {
        try {
          const { token } = req.query;  // Get token from query params
      
          if (!token) {
            return res.status(400).json({ message: "Verification token is missing" });
          }
      
          // Verify the token
          const decoded = jwt.verify(token, process.env.SECRET_KEY);  // Verify the JWT with the secret
      
          // Find user by ID (userId is stored in the token payload)
          const user = await User.findById(decoded.userId);
          if (!user) {
            return res.status(404).json({ message: "User not found" });
          }
      
          // Check if the user is already verified
          if (user.isVerified) {
            return res.status(400).json({ message: "Email is already verified" });
          }
      
          // Update user as verified
          user.isVerified = true;
          await user.save();  // Save the updated user
      
          return res.status(200).json({ message: "Email successfully verified!" });
        } catch (error) {
          if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Verification token has expired" });
          }
      
          return res.status(500).json({ message: "Error verifying email: " + error.message });
        }
      };

  

export default router;  // ktu  o errori per oren e artdhshme me rregullu importin s