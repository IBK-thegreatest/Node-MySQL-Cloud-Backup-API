import { HttpException } from "../exceptions/HttpException";
import { db } from "../config/dbConfig";
import { Folder } from "../interfaces/folder.interface";

//CREATE A FOLDER
export const createFolderService = async (userId: string, folderData: Folder) => {
    const maxFolder: string = await db.FolderModel.max('folderId');
    let newId = (maxFolder ? parseInt(maxFolder.split('-')[1], 10) + 1 : 1);
    let folderId = `FOLDER-${newId.toString().padStart(3, '0')}`;
    while (await db.FolderModel.findOne({ where: { folderId } })) {
        newId++;
        folderId = `FOLDER-${newId.toString().padStart(3, '0')}`;
    }
    const data = {
        folderId: folderId,
        userId: userId,
        folderName: folderData.folderName
    }
    const newFolder = await db.FolderModel.create(data)
    return newFolder
}

//GET A FOLDER
export const getFolderService = async (userId: string, folderId: string) => {
    const user = await db.UserModel.findOne({ where: { userId: userId }})
    if(!user) throw new HttpException(404, "This user does not Exist")

    const folder = await db.FolderModel.findOne({ where: { folderId: folderId }, include: { model: db.FileModel }})
    if(!folder) throw new HttpException(404, "This Folder does not exist")
    return folder
}

//GET ALL FOLDERS CREATED BY A USER
export const getUserFoldersService = async (userId: string) => {
    const user = await db.UserModel.findOne({ where: { userId: userId }})
    if(!user) throw new HttpException(404, "This user does not Exist")

    const getUserFolders = await db.FolderModel.findAll({ where: { userId: userId }})
    if(!getUserFolders) throw new HttpException(404, "This user hasn't created any Folders yet")
    return getUserFolders
}