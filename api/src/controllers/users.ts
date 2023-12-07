import { Router, Request, Response, NextFunction } from "express"
import Users from "../models/users"

const route = Router()

route.get("/getall", (req: Request, res: Response) => {
    Users.find()
        .then((allusers) => res.status(200).json(allusers))
        .catch(err => err)
})

export default route