import express from "express";
import { createListing } from "../controllers/ListingController.js";
import { verifyToken } from "../utils/VerifyUser.js";
const listingRouter = express.Router()

listingRouter.post("/create",verifyToken,createListing)
export default listingRouter;