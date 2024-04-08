import { HttpException } from "../exceptions/HttpException";
import { RequestWithUser } from "../interfaces/auth.interface";
import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken"

export const verifyToken = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    const authHeader = req.headers.authorization
    if(authHeader) {
        const token = authHeader.split(" ")[1]
        jwt.verify(
            token,
            process.env.JWT_SEC,
            (err, payLoad) => {
                if(err) throw new HttpException(403, "Your Token is Invalid")
                req.user = payLoad
                next();
            }
        )
    } else {
        throw new HttpException(401, "You are not Authenticated Yet!!!")
    }
}

export const verifyUser = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    verifyToken(req, res, () => {
        if(req.user.userId === req.params.userId) {
            next();
        } else {
            res.status(401).json({
                success: false,
                status: 401,
                message: "You are not authorized to do this"
            })
        }
    })
}

export const verifyAdmin = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    verifyToken(req, res, () => {
        if(req.user.isAdmin) {
            next();
        } else {
            res.status(401).json({
                success: false,
                status: "OK",
                message: "You are not an Admin, So you are not authorized to do this"
            })
        }
    })
}