import { ObjectId } from "mongoose"

export declare interface auth {
    username: string
    password: string
}

export declare interface createuser {
    firsname: string
    lastname: string
    username: string
    email: string,
    password: string
}

export declare interface IdPayload {
    id: ObjectId
    exp: number
    iat: number
    username: string
    role: string
}