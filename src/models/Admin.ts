import { sequelize } from "../config/dbConfig";
import Sequelize from "sequelize";

const AdminModel = sequelize.define("Admin", {
    adminId: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    userId: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

export default AdminModel