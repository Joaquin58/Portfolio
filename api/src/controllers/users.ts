import { Router, Request, Response, NextFunction } from "express"
import User from "../models/user"

const route = Router()

route.get("/getall", (req: Request, res: Response) => {
    User.find()
        .then((allusers) => res.status(200).json(allusers))
        .catch(err => err)
})

export default route