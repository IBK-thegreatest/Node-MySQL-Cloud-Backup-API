import { Request } from "express"

export interface DataStoredInToken {
    userId: string
    isAdmin: boolean
}

export interface RequestWithUser extends Request {
    user: any
}