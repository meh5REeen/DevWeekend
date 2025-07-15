import express from "express";
import { createListing,deleteListing } from "../controllers/ListingController.js";
import { verifyToken } from "../utils/VerifyUser.js";
const listingRouter = express.Router()

listingRouter.post("/create",verifyToken,createListing)
listingRouter.delete("/delete/:id",verifyToken,deleteListing)
export default listingRouter;