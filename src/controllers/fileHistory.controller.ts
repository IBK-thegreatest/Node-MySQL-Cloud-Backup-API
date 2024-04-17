import { Response, NextFunction } from "express";
import { RequestWithUser } from "../interfaces/auth.interface";
import { userFileHistoryService } from "../services/fileHistory.services";

export const userFileHistory = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.params.userId
        const userFiles = await userFileHistoryService(userId)
        res.status(200).json(userFiles)
    } catch (error) {
        next(error)
    }
}