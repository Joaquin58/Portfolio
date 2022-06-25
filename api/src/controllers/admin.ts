import { Router, Request, Response, NextFunction } from "express"
import User from "../models/user"
import { auth, createuser } from "./types/auth"

const route = Router()

route.post("/login", async (req: Request, res: Response) => {
    // const { username, password }: { username: string, password: string } = req.body
    const auth: auth = req.body
    const user = await User.findOne(auth)
    const logincorrect = user === null ? false
        : auth.password //metodo del hash, comparar las contraseñas con !bycrypt
    if (!logincorrect) return res.status(401).json({
        error: "invalid user or password"
    })

    res.status(200).send({
        name: user?.firstname,
        username: user?.username
    })
})

route.post("/create", (req: Request, res: Response) => {
    const body: createuser = req.body
    User.find(body).then((response)=>{
        console.log(response)
    })
    User.create(body)
        .then((response) => {
            response.save()
            res.status(200).json({
                msg: "usuario creado"
            })
        })
        .catch(err => res.status(500).json(err))
})

export default route