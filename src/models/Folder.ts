import { sequelize } from "../config/dbConfig";
import Sequelize from "sequelize"

const FolderModel = sequelize.define("Folder", {
    folderId: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    userId: {
        type: Sequelize.STRING,
        allowNull: false
    },
    folderName: {
        type: Sequelize.STRING,
        allowNull: false
    }
})


export default FolderModel