import { db } from "../config/dbConfig";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { Login, Register, User } from "../interfaces/user.interface";
import { HttpException } from "../exceptions/HttpException";
import { emailValidator, schema } from "../middlewares/validation.middleware";
import { DataStoredInToken } from "../interfaces/auth.interface";

//REGISTER A USER
export const registerService = async (userData: Register) => {
    const ifAlreadyExists = await db.UserModel.findOne({ where: { email: userData.email }})
    if(ifAlreadyExists) throw new HttpException(409, "This User Already Exists")
    
    if(userData.username.length < 6) {
        throw new HttpException(403, "Username should be at least 6 characters")
    } else if (!emailValidator.validate(userData.email)) {
        throw new HttpException(403, "Invalid Email Address, email address should be in the form foo@bar.com")
    } else if (!schema.validate(userData.password)) {
        throw new HttpException(403, "Invalid Password, Password must contain uppercase letters, lowercase letters, no whitespaces and at least 2 digits")
    } else {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(userData.password, salt)
        const maxUser: string = await db.UserModel.max('userId');
        let newId = (maxUser ? parseInt(maxUser.split('-')[1], 10) + 1 : 1);
        let userId = `CBA-${newId.toString().padStart(3, '0')}`;
        while (await db.UserModel.findOne({ where: { userId } })) {
            newId++;
            userId = `CBA-${newId.toString().padStart(3, '0')}`;
        }
        const data = {
            userId: userId,
            username: userData.username,
            email: userData.email,
            password: hashedPassword,
            isAdmin: userData.isAdmin ? userData.isAdmin : false
        }
        const newUser = await db.UserModel.create(data)
        if(userData.isAdmin) {
            const maxAdmin: string = await db.AdminModel.max('adminId');
            let newId = (maxAdmin ? parseInt(maxAdmin.split('-')[1], 10) + 1 : 1);
            let adminId = `ADMIN-${newId.toString().padStart(3, '0')}`;
            while (await db.AdminModel.findOne({ where: { adminId } })) {
                newId++;
                adminId = `ADMIN-${newId.toString().padStart(3, '0')}`;
            }
            const adminData = {
                adminId: adminId,
                userId: userId
            }
            await db.AdminModel.create(adminData)
        }
        return newUser
    }
}

//LOGIN AN EXISTING USER
export const loginService = async (userData: Login): Promise<User> => {
    const user = await db.UserModel.findOne({ where: { email: userData.email } }) as unknown as Register | null
    if(!user) throw new HttpException(404, "User Not Found!!!")

    const isPasswordCorrect = await bcrypt.compare(userData.password, user.password)
    if(!isPasswordCorrect) throw new HttpException(403, "Email Address and Password don't match")
    
    const dataStoredIntoken: DataStoredInToken = {
        userId: user.userId,
        isAdmin: user.isAdmin
    }
    const accessToken = jwt.sign(dataStoredIntoken, process.env.JWT_SEC, { expiresIn: "24h" })
    const loginData: User = {
        userId: user.userId,
        username: user.username,
        email: user.email,
        password: user.password,
        isAdmin: user.isAdmin,
        token: accessToken
    }
    return loginData
}