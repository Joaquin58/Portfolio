import { Response, NextFunction } from "express";
import { verify } from "jsonwebtoken"
import { IdPayload } from "../controllers/types/auth"
import { idRequest } from "../controllers/types/req";
import config from "../lib/config";

const userExtractor = (req: idRequest, res: Response, next: NextFunction) => {
    try {
        const authorization = req.get("authorization")
        let token = ""
        if (authorization && authorization.toLocaleLowerCase().startsWith('bearer')) {
            token = authorization.substring(7)
        }

        const decodedToken = verify(token, config.PrivetKey1) as IdPayload

        if (!token || !decodedToken.id) {
            return res.status(401).json({
                error: "token faltante o incalido"
            })
        }
        const { id: userid } = decodedToken

        req.userId = userid
        next()
    } catch (error) {
        next()
    }

}
export default userExtractor