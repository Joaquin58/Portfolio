import { Router, Request, Response, NextFunction } from "express"
import User from "../models/user"
import { auth, createuser } from "./types/auth"
import jwt from "jsonwebtoken"
import config from "../lib/config"


const route = Router()

//todo: creando y hash antes del modelo
route.post("/create", (req: Request, res: Response) => {
    const body: createuser = req.body
    const { email }: createuser = req.body
    User.findOne({ email })
        .then(payload => {
            if (!payload) return User.create(body)
            else if (payload) res.status(403).json({
                msg: "ya se ha utilizado esta direccion de correo"
            })
            else return null
        })
        .then((payload) => {
            payload && res.status(200).json({
                msg: "usuario creado"
            })

        })
        .catch((err: any) => {res.status(500).json(err)})
})

//todo: crea el login pero el con la comparacion dentro del modelo y retorna un metodo nuevo de la instancia

route.post("/login", async (req: Request, res: Response) => {
    // const { username, password }: { username: string, password: string } = req.body  
    const { username, password }: auth = req.body
    const user = await User.findOne({ username })
    const passwordcorrect = await user?.login({ password })
    if (!(user && passwordcorrect)) return res.status(401).json({
        error: "invalid user or password"
    })

    const userForToken: { id: Object , username: string } = {
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

export default route