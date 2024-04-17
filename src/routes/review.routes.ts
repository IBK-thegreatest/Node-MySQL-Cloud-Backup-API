import { addReview, shouldDeleteFile } from "../controllers/review.controller"
import express, { Router } from "express"
import { verifyAdmin, verifyUser } from "../middlewares/auth.middleware"
const router: Router = express.Router()

//ADD A REVIEW BY AN ADMIN
router.post("/:userId/:fileId", verifyUser, verifyAdmin, addReview)


export default router