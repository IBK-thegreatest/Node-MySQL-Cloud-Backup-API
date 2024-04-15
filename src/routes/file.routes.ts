import { downloadFile, uploadFile } from "../controllers/file.controller"
import express, { Router } from "express"
import { verifyUser } from "../middlewares/auth.middleware"
import { upload } from "../services/file.services"
const router: Router = express.Router()

//UPLOAD A FILE
router.post("/:userId/:folderId/upload", verifyUser, upload.single("image"), uploadFile)

//DOWNLOAD A FILE
router.get("/:userId/download/:fileId", verifyUser, downloadFile)


export default router