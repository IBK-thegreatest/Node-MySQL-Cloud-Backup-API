import { HttpException } from "../exceptions/HttpException"
import { Response, NextFunction } from "express"
import { RequestWithUser } from "../interfaces/auth.interface"
import { compressFileService, createFileService, downloadFileService } from "../services/file.services"

//UPLOADING A FILE
export const uploadFile = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
        if(req.file === undefined) throw new HttpException(400, "No file was uploaded, Please Upload a file")
        const userId = req.params.userId
        const folderId = req.params.folderId
        const fileData = {
            fileName: req.file.originalname,
            filePath: req.file.path,
            fileSize: req.file.size,
            isSafe: true
        }
        const imageData = await createFileService(userId, folderId, fileData)
        res.status(200).json({
            success: true,
            status: "OK",
            message: "File has been Successfully Uploaded",
            data: imageData
        })
    } catch (error) {
        next(error)
    }
}

//DOWNLOADING A FILE
export const downloadFile = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.params.userId
        const fileId = req.params.fileId
        const filePath = await downloadFileService(userId, fileId)
        res.status(200).download(filePath)
    } catch (error) {
        next(error)
    }
}

//COMPRESSING A FILE
export const compressfile = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.params.userId
        const fileId = req.params.fileId
        const compressedFilePath = await compressFileService(userId, fileId)
        res.status(200).json({
            success: true,
            status: "OK",
            message: "File has been successfully compressed",
            path: compressedFilePath
        })
    } catch (error) {
        next(error)
    }
}