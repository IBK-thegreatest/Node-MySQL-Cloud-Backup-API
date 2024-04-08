import { Register } from "../interfaces/user.interface"
import { db } from "../config/dbConfig"
import { HttpException } from "../exceptions/HttpException"
import { emailValidator, schema } from "../middlewares/validation.middleware"

//GET ALL USERS
export const getAllUsersService = async (): Promise<Register[]> => {
    const users = await db.UserModel.findAll({}) as unknown as Register[]
    return users
}

//GET A USER
export const getUserService = async (userId: string): Promise<Register> => {
    const user = await db.UserModel.findOne({ where: { userId: userId }}) as unknown as Register
    if(!user) throw new HttpException(404, "This user does not exist")

    return user
}

//UPDATE USER INFORMATION
export const updateUserService = async (userId: string, userData: Register) => {
    const user = await db.UserModel.findOne({ where: { userId: userId }}) as unknown as Register
    if(!user) throw new HttpException(404, "This user does not exist")
    
    if(userData.email) {
        if(!emailValidator.validate(userData.email)) throw new HttpException(403, "Invalid Email Address. Email Address should be in the format foo@bar.com")
        const updatedUser = await db.UserModel.update(userData, { where: { userId: userId }})
        return updatedUser
    } else if (userData.password) {
        if(!schema.validate(userData.password)) throw new HttpException(403, "Invalid Password. Password must contain uppercase letter, lowercase letter, no whitespaces and at least 2 digits")
        const updatedUser = await db.UserModel.update(userData, { where: { userId: userId }})
        return updatedUser
    } else {
        const updatedUser = await db.UserModel.update(userData, { where: { userId: userId }})
        return updatedUser
    }
}

//DELETING USER INFORMATION
export const deleteUserService = async (userId: string) => {
    const user = await db.UserModel.findOne({ where: { userId: userId }}) as unknown as Register
    if(!user) throw new HttpException(404, "This user does not exist")
    
    await db.UserModel.destroy({ where: { userId: userId }})
}