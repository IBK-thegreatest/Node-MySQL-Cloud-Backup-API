import express, { Router } from "express"
import { verifyAdmin, verifyUser } from "../middlewares/auth.middleware"
import { getAllUsers, getUser, updateUser } from "../controllers/user.controller"
const router: Router = express.Router()

//GET ALL USERS
router.get("/", verifyAdmin, getAllUsers)

//GET A USER
router.get("/:userId", verifyUser, getUser)

//UPDATE USER INFORMATION
router.put("/:userId", verifyUser, updateUser)

//DELETE USER INFORMATION
router.put("/:userId", verifyUser, getAllUsers)



export default router