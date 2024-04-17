import { Response, NextFunction } from "express";
import { RequestWithUser } from "../interfaces/auth.interface";
import { addReviewService, shouldDeleteFileService } from "../services/review.services";

export const addReview = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.params.userId
        const fileId = req.params.fileId
        const reviewData = req.body
        const createReviewData = await addReviewService(userId, fileId, reviewData)
        res.status(200).json({
            success: true,
            status: "OK",
            message: "Review has been Successfully added",
            data: createReviewData
        })
    } catch (error) {
        next(error)
    }
}

export const shouldDeleteFile = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.params.userId
        const folderId = req.params.folderId
        const fileId = req.params.fileId
        const fileData = req.body
        await shouldDeleteFileService(userId, folderId, fileId, fileData)
        res.status(200).json({
            success: true,
            status: "OK",
            message: "The File has been marked unsafe and automatically deleted after at least 3 Admin reviews"
        })
    } catch (error) {
        next(error)
    }
}