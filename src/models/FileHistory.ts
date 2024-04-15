import { sequelize } from "../config/dbConfig";
import Sequelize from "sequelize"

const FileHistoryModel = sequelize.define("File_history", {
    historyId: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    fileId: {
        type: Sequelize.STRING,
        allowNull: false
    },
    userId: {
        type: Sequelize.STRING,
        allowNull: false
    },
    action: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isIn: [["upload", "download", "compress"]]
        }
    }
})


export default FileHistoryModel