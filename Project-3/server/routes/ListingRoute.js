import express from "express";
import { createListing,deleteListing,getListing, Updatelisting ,} from "../controllers/ListingController.js";
import { verifyToken } from "../utils/VerifyUser.js";
const listingRouter = express.Router()

listingRouter.post("/create",verifyToken,createListing)
listingRouter.delete("/delete/:id",verifyToken,deleteListing)
listingRouter.post("/update/:id",verifyToken,Updatelisting)
listingRouter.get("/get/:listingid",getListing)

export default listingRouter;