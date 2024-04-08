import { Sequelize } from "sequelize"
import dotenv from "dotenv"
import { dbConfig } from "../interfaces/dbConfig.interface";
dotenv.config();

const configDetails: dbConfig = {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    DATABASE: process.env.DB_DATABASE,
    DIALECT: 'mysql',
    POOL: {
        MAX: 5,
        MIN: 0,
        ACQUIRE: 30000,
        IDLE: 10000
    }
}

export const sequelize = new Sequelize(
    configDetails.DATABASE,
    configDetails.USER,
    configDetails.PASSWORD, {
        host: configDetails.HOST,
        dialect: configDetails.DIALECT,
        pool: {
            max: configDetails.POOL.MAX,
            min: configDetails.POOL.MIN,
            acquire: configDetails.POOL.ACQUIRE,
            idle: configDetails.POOL.IDLE
        }
    }
)

import UserModel from "../models/User";
import AdminModel from "../models/Admin";
import FileModel from "../models/File";
import FileHistoryModel from "../models/FileHistory";
import FolderModel from "../models/Folder";
import ReviewModel from "../models/Review";

UserModel.hasMany(FolderModel, { foreignKey: "userId", onDelete: "cascade" })
UserModel.hasMany(AdminModel, { foreignKey: "userId", onDelete: "cascade" })
UserModel.hasMany(FileModel, { foreignKey: "userId", onDelete: "cascade" })
UserModel.hasMany(FileHistoryModel, { foreignKey: "userId", onDelete: "cascade" })
UserModel.hasMany(ReviewModel, { foreignKey: "userId", onDelete: "cascade" })
FolderModel.hasMany(FileModel, { foreignKey: "folderId", onDelete: "cascade" })
FileModel.hasMany(ReviewModel, { foreignKey: "fileId", onDelete: "cascade" })
FileModel.hasMany(FileHistoryModel, { foreignKey: "fileId", onDelete: "cascade" })
AdminModel.belongsTo(UserModel, { foreignKey: "userId", onDelete: "cascade" })
FileModel.belongsTo(UserModel, { foreignKey: "userId", onDelete: "cascade" })
FileModel.belongsTo(FolderModel, { foreignKey: "fileId", onDelete: "cascade" })
FolderModel.belongsTo(UserModel, { foreignKey: "userId", onDelete: "cascade" })
FileHistoryModel.belongsTo(UserModel, { foreignKey: "userId", onDelete: "cascade" })
FileHistoryModel.belongsTo(FileModel, { foreignKey: "fileId", onDelete: "cascade" })
ReviewModel.belongsTo(UserModel, { foreignKey: "userId", onDelete: "cascade" })
ReviewModel.belongsTo(FileModel, { foreignKey: "fileId", onDelete: "cascade" })

export const db = {
    sequelize,
    Sequelize,
    UserModel,
    AdminModel,
    FileModel,
    FileHistoryModel,
    FolderModel,
    ReviewModel
}