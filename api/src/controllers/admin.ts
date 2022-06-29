import { Router, Request, Response, NextFunction } from "express"
import User from "../models/user"
import { auth, createuser } from "./types/auth"
import jwt from "jsonwebtoken"
import config from "../lib/config"
import { compare, hash, genSalt } from "bcrypt";

const route = Router()

route.post("/login", async (req: Request, res: Response) => {
    // const { username, password }: { username: string, password: string } = req.body
    const { username, password }: auth = req.body
    //!cambiar la busqueda de usuario por la password
    const user = await User.findOne({ username })
    console.log(user)
// ! cehckt the error in compare
    let match = true
    !(user === null) && (match = await compare(password, user.password))
    console.log(match)

    const passwordcorrect = user === null
        ? false
        : await compare(password, user.password)

    if (!(user && passwordcorrect)) return res.status(401).json({
        error: "invalid user or password"
    })

    const userForToken: { id: string, username: string } = {
        id: user._id,
        username: user.username
    }
    if (config.PrivetKey1.length === 0) return res.status(404).json({ msg: "privetkey no porporcionada" })
    const token = jwt.sign(userForToken, config.PrivetKey1, {
        expiresIn: 60 * 60 * 9
    })      //!palabra secreta en variables de entorno


    res.status(200).send({
        name: user?.firstname,
        username: user?.username,
        token
    })
})

route.post("/create", (req: Request, res: Response) => {
    const body: createuser = req.body
    User.find(body).then((response) => {
        console.log(response)
    })
    User.create(body)
        .then((response) => response.save())
        .then((response) => res.status(200).json({
            msg: "usuario creado"
        }))
        .catch(err => res.status(500).json(err))
})

export default route