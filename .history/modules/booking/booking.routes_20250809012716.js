import express from "express";
import { createBooking,getAllBookings,updateBookings,deleteBookings,updateStatus,cancelMyBooking} from "./booking.controller.js";
import { isAuthenticated , authorize} from "../../middlewares/auth.middleware.js";

const router = express.Router();
//mebo getmy bookings endpoint
//mrbo ni booking cancel booking
//updateStatus
//stats me nxjerr satistikat per shitje

router.post("/:tourId",isAuthenticated, createBooking)

router.get("/",isAuthenticated, getAllBookings)

router.put("/:id",isAuthenticated,authorize, updateBookings)

router.delete("/:id",isAuthenticated, authorize ,deleteBookings)

router.put("/updateStatus/:bookingId", isAuthenticated,authorize(["user"])updateStatus)

router.put("/cancelMyBooking/:bookingId", isAuthenticated,authorize(["user"])cancelMyBooking)


router.delete(  "/:bookingId", isAuthnticated, authorize(["admin"]), deleteBooking
  );


export default router;
