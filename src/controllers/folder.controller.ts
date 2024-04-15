import { Response, NextFunction } from "express"
import { RequestWithUser } from "../interfaces/auth.interface"
import { createFolderService, getFolderService, getUserFoldersService } from "../services/folder.services"

//CREATE A FOLDER
export const createFolder = async(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.user.userId
        const folderData = req.body
        const newFolderData = await createFolderService(userId, folderData)
        res.status(200).json({
            success: true,
            status: "OK",
            message: "Folder has been Uploaded Successfully and Metadata has been Saved",
            data: newFolderData
        })
    } catch (error) {
        next(error)
    }
}

//GET A FOLDER
export const getFolder = async(req: RequestWithUser, res: Response,next: NextFunction): Promise<void> => {
    try {
        const userId = req.user.userId
        const folderId = req.params.folderId
        const folder = await getFolderService(userId, folderId)
        res.status(200).json(folder)
    } catch (error) {
        next(error)
    }
}

//GET ALL USER FOLDER
export const getUserFolders = async(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.params.userId
        const folders = await getUserFoldersService(userId)
        res.status(200).json(folders)
    } catch (error) {
        next(error)
    }
}