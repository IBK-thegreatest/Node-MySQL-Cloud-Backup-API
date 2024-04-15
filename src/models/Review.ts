import { sequelize } from "../config/dbConfig";
import Sequelize from "sequelize"

const ReviewModel = sequelize.define("Review", {
    reviewId: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    userId: {
        type: Sequelize.STRING,
        allowNull: false
    },
    fileId: {
        type: Sequelize.STRING,
        allowNull: false
    },
    isSafe: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    }
})


export default ReviewModel