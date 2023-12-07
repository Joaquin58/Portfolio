import { Request } from "express"
import { ObjectId } from "mongoose"
export declare interface idRequest extends Request {
    userId?: ObjectId;
    usernane?: string;
    role?: string
}
