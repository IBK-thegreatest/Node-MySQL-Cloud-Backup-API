import { sequelize } from "../config/dbConfig";
import Sequelize from "sequelize";

const UserModel = sequelize.define("User", {
    userId: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
})


export default UserModel