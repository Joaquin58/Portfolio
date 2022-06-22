import { Response, Request, Router, NextFunction } from 'express'
import User from "../models/user"

const app = Router()

app.get("/", (req: Request, res: Response) => {
    User.find({}, { email: 1, firstname: 1, _id: 0 })
        .then((response) => res.status(200).json(response))
        .catch((err) => res.status(500).json(err))
})

app.post("/", (req: Request, res: Response) => {
    try {
        const user = new User(req.body)
        user.save()
        console.log(user)
        res.status(200).json(user)
    } catch (err) {
        res.status(500).send(err)
    }
})



export default app