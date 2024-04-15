import { FileData } from "../interfaces/file.interface"
import { RequestWithUser } from "../interfaces/auth.interface"
import multer from "multer"
import path from "path"
import { db } from "../config/dbConfig"
import { HttpException } from "../exceptions/HttpException"

//API FOR UPLOADING A FILE
const storage = multer.diskStorage({   //Outlining the file specification
    destination: (req: RequestWithUser, file, cb) => {
        cb(null, "images")
    },
    filename: (req: RequestWithUser, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    },
})
export const upload = multer({      //Initializing the upload of the file
    storage: storage,
    limits: { fileSize: 200 * 1024 * 1024 }
})
//STORING THE FILE METADATA
export const createFileService = async(userId: string, folderId: string, fileData: FileData) => {
    const maxFile: string = await db.FileModel.max('fileId');
    let newId = (maxFile ? parseInt(maxFile.split('-')[1], 10) + 1 : 1);
    let fileId = `FILE-${newId.toString().padStart(3, '0')}`;
    while (await db.FileModel.findOne({ where: { fileId } })) {
        newId++;
        fileId = `FILE-${newId.toString().padStart(3, '0')}`;
    }
    const fileMetadata = {
        fileId: fileId,
        userId: userId,
        fileName: fileData.fileName,
        filePath: fileData.filePath,
        fileSize: fileData.fileSize,
        isSafe: fileData.isSafe,
        folderId: folderId
    }
    const newFile = await db.FileModel.create(fileMetadata)
    //RECORDING THE OPERATION DONE ON THE FILE HISTORY TABLE
    const maxHistory: string = await db.FileHistoryModel.max('historyId');
    let newHistoryId = (maxHistory ? parseInt(maxHistory.split('-')[1], 10) + 1 : 1);
    let historyId = `HISTORY-${newHistoryId.toString().padStart(3, '0')}`;
    while (await db.FileHistoryModel.findOne({ where: { historyId } })) {
        newHistoryId++;
        historyId = `HISTORY-${newHistoryId.toString().padStart(3, '0')}`;
    }
    let action = "upload"
    const fileHistoryData = {
        historyId: historyId,
        fileId: fileId,
        userId: userId,
        action: action
    }
    await db.FileHistoryModel.create(fileHistoryData)

    return newFile
}

//API FOR DOWNLOADING A FILE
export const downloadFileService = async(userId: string, fileId: string) => {
    const file = await db.FileModel.findOne({ where: { fileId: fileId }}) as unknown as FileData
    if(!file) throw new HttpException(404, "This file does not exist")
    
    const maxHistory: string = await db.FileHistoryModel.max('historyId');
    let newHistoryId = (maxHistory ? parseInt(maxHistory.split('-')[1], 10) + 1 : 1);
    let historyId = `HISTORY-${newHistoryId.toString().padStart(3, '0')}`;
    while (await db.FileHistoryModel.findOne({ where: { historyId } })) {
        newHistoryId++;
        historyId = `HISTORY-${newHistoryId.toString().padStart(3, '0')}`;
    }
    let action = "download"
    const fileHistoryData = {
        historyId: historyId,
        fileId: fileId,
        userId: userId,
        action: action
    }
    await db.FileHistoryModel.create(fileHistoryData)

    return file.filePath
}