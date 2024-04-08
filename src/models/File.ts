import { sequelize } from "../config/dbConfig";
import Sequelize from "sequelize"

const FileModel = sequelize.define("File", {
    fileId: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    userId: {
        type: Sequelize.STRING,
        allowNull: false
    },
    fileName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    filePath: {
        type: Sequelize.STRING,
        allowNull: false
    },
    fileSize: {
        type: Sequelize.STRING,
        allowNull: false
    },
    isSafe: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
})

export default FileModel