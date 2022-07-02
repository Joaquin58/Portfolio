import { Router, Response } from "express"
import userExtractor from "../middlewares/userExtractor"
import { idRequest } from "./types/req"
const route = Router()
import User from "../models/user"

route.post("/newproj", userExtractor, async (req: idRequest, res: Response) => {
    try {
        const { userId } = req
        User.findById(userId).then((response) => {
            res.status(200).json({ response })
        })
    } catch (error: any) {
        console.log(error)
        return res.status(error?.status || 500).send(error?.message || error)
    }
})

export default route