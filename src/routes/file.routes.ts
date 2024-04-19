import { compressfile, downloadFile, uploadFile } from "../controllers/file.controller"
import express, { Router } from "express"
import { verifyAdmin, verifyUser } from "../middlewares/auth.middleware"
import { upload } from "../services/file.services"
import { shouldDeleteFile } from "../controllers/review.controller"
const router: Router = express.Router()

//UPLOAD A FILE
router.post("/:userId/:folderId/upload", verifyUser, upload.single("image"), uploadFile)

//DOWNLOAD A FILE
router.get("/:userId/download/:fileId", verifyUser, downloadFile)

//COMPRESS A FILE
router.get("/:userId/compress/:fileId", verifyUser, compressfile)

//FILES MARKED AS UNSAFE BY MULTIPLE ADMINS TO BE AUTOMATICALLY DELETED
router.put("/:userId/:folderId/:fileId", verifyUser, verifyAdmin, shouldDeleteFile)


export default router