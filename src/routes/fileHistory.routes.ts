import express, { Router } from "express"
import { verifyUser } from "../middlewares/auth.middleware"
import { userFileHistory } from "../controllers/fileHistory.controller"
const router: Router = express.Router()

//USER CAN VIEW THER FILE HISTORY
router.get("/:userId", verifyUser, userFileHistory)


export default router