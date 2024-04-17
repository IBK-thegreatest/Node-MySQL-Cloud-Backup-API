import { HttpException } from "../exceptions/HttpException"
import { db } from "../config/dbConfig"

//USERS CAN VIEW THEIR FILE HISTORY
export const userFileHistoryService = async (userId: string) => {
    const user = await db.UserModel.findOne({ where: { userId: userId }})
    if(!user) throw new HttpException(404, "This User does not exist")

    const userFiles = await db.FileHistoryModel.findAll({ where: { userId: userId }})
    return userFiles
}