import { Review } from "../interfaces/review.interface";
import { db } from "../config/dbConfig";
import { HttpException } from "../exceptions/HttpException";
import { FileData } from "../interfaces/file.interface";

export const addReviewService = async (userId: string, fileId: string, reviewData: Review) => {
    const user = await db.UserModel.findOne({ where: { userId: userId }})
    if(!user) throw new HttpException(403, "This user does not exist")
    const file = await db.FileModel.findOne({ where: { fileId: fileId }})
    if(!file) throw new HttpException(404, "This file does not exist")
    
    //Checking the user who is an admin has already reviewed this file
    const existingReview = await db.ReviewModel.findOne({ where: { userId: userId, fileId: fileId }})
    if(existingReview) throw new HttpException(409, "This Admin user has already given a review on this file")
    
    const maxReview: string = await db.ReviewModel.max('reviewId');
    let newId = (maxReview ? parseInt(maxReview.split('-')[1], 10) + 1 : 1);
    let reviewId = `REVIEW-${newId.toString().padStart(3, '0')}`;
    while (await db.ReviewModel.findOne({ where: { reviewId } })) {
        newId++;
        reviewId = `REVIEW-${newId.toString().padStart(3, '0')}`;
    }
    const data = {
        reviewId: reviewId,
        userId: userId,
        fileId: fileId,
        isSafe: reviewData.isSafe
    }
    const newReview = await db.ReviewModel.create(data)
    return newReview
}

export const shouldDeleteFileService = async (userId: string, folderId: string, fileId: string, fileData: FileData) => {
    const user = await db.UserModel.findOne({ where: { userId: userId }})
    if(!user) throw new HttpException(403, "This user does not exist")
    const folder = await db.FolderModel.findOne({ where: { folderId: folderId }})
    if(!folder) throw new HttpException(404, "This Folder does not exist")
    const file = await db.FileModel.findOne({ where: { fileId: fileId }}) as unknown as FileData
    if(!file) throw new HttpException(404, "This file does not exist")

    //Checking if the file belongs to this particular folder
    const fileFolder = await db.FileModel.findOne({ where: { folderId: folderId, fileId: fileId }}) as unknown as FileData
    if(!fileFolder) throw new HttpException(403, "This File doesn't belong to this folder")

    const reviews = await db.ReviewModel.findAll({ where: { fileId: fileId, isSafe: false }})
    if(reviews.length < 3) throw new HttpException(401, "The Number of Admin Reviews is less than 3, so this file can't be marked as unsafe for automatic deletion")
    if(reviews.length > 2) {
        await db.FileModel.update(fileData, { where: { fileId: fileId }})
        await db.FileModel.destroy({ where: { fileId: fileId }})
    }
}