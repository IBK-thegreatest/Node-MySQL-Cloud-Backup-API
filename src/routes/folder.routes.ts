import { createFolder, getFolder, getUserFolders } from "../controllers/folder.controller"
import express, { Router } from "express"
import { verifyToken, verifyUser } from "../middlewares/auth.middleware"
const router: Router = express.Router()

//CREATE A FOLDER
router.post("/", verifyToken, createFolder)

//GET A FOLDER
router.get("/:userId/:folderId", verifyUser, getFolder)

//GET USER FOLDERS
router.get("/:userId", verifyUser, getUserFolders)


export default router