import { Router, Response } from "express"
import userExtractor from "../middlewares/userExtractor"
import { idRequest } from "./types/req"
const route = Router()
import User from "../models/user"
import Project from "../models/Project"

route.post("/findprojects", userExtractor, async (req: idRequest, res: Response) => {
    try {
        const { userId } = req
        Project.find().then((response) => {
            res.status(200).json({ response })
        })
    } catch (error: any) {
        console.log(error)
        return res.status(500).send(error)
    }
})

export default route