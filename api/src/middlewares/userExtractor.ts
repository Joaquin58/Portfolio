import { Response, NextFunction } from "express";
import { verify } from "jsonwebtoken"
import { IdPayload } from "../controllers/types/auth"
import { idRequest } from "../controllers/types/req";
import config from "../lib/config";
import Blacklist from "../models/Blacklist";

const userExtractor = async (req: idRequest, res: Response, next: NextFunction) => {

    try {
        const authorization = req.get("authorization")

        let token = ""

        if (authorization && authorization.toLocaleLowerCase().startsWith('bearer')) {
            token = authorization.substring(7)
        }

        if (await Blacklist.findOne({ token })) {
            return res.status(401).json({ message: "Token revocado" })
        }

        const decodedToken = verify(token, config.PrivetKey1) as IdPayload


        if (!token || !decodedToken.id) {
            return res.status(401).json({
                error: "token faltante o incalido"
            })
        }

        const { id, role } = decodedToken
        
        req.userId = id
        req.role = role

        next()
    } catch (error) {
        return res.status(401).json({ message: "This session has expired. Please login", error })
        
    }

}

//!manejo de errores

const userExtractor2 = async (req: idRequest, res: Response, next: NextFunction) => {

    try {
        const authHeader = req.headers["cookie"]
        if (!authHeader) return res.status(401).json({ message: "not auth" })

        const cookie = authHeader.split("=")[1]
        const accesToken = cookie.split(";")[0]

        const checkBlacklist = await Blacklist.findOne({ token: accesToken })

        if (checkBlacklist) return res.status(401).json({ message: "This sessions has experied. Please login" })

        const decodedToken = verify(cookie, config.PrivetKey1) as IdPayload
        const { id: userid, role } = decodedToken

        req.userId = userid
        req.role = role

        next()
    } catch (error) {
        return res.status(401).json(
            {
                message: "This session has expired. Please login",
                error
            }
        )
    }

}

export default userExtractor