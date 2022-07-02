import { Router, Request, Response, NextFunction } from "express"
import User from "../models/user"
import { auth, createuser } from "./types/auth"
import jwt from "jsonwebtoken"
import config from "../lib/config"


const route = Router()

//todo: crea el login pero el con la comparacion dentro del modelo y retorna un metodo nuevo de la instancia

route.post("/login", async (req: Request, res: Response) => {
    // const { username, password }: { username: string, password: string } = req.body
    const { username, password }: auth = req.body
    const user = await User.findOne({ username })
    const passwordcorrect = await user?.login({ password })
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

//todo: crea el login pero el con la comparacion dentro de la ruta
// route.post("/login", async (req: Request, res: Response) => {
//     // const { username, password }: { username: string, password: string } = req.body
//     const { username, password }: auth = req.body
//     const user = await User.findOne({ username })
//     const passwordcorrect = user === null
//         ? false
//         : await compare(password, user.password)

//     if (!(user && passwordcorrect)) return res.status(401).json({
//         error: "invalid user or password"
//     })

//     const userForToken: { id: string, username: string } = {
//         id: user._id,
//         username: user.username
//     }
//     if (config.PrivetKey1.length === 0) return res.status(404).json({ msg: "privetkey no porporcionada" })
//     const token = jwt.sign(userForToken, config.PrivetKey1, {
//         expiresIn: 60 * 60 * 9
//     })      //!palabra secreta en variables de entorno


//     res.status(200).send({
//         name: user?.firstname,
//         username: user?.username,
//         token
//     })
// })

//todo: primero hashea y despues crea el modelo
// route.post("/create", (req: Request, res: Response) => {
//     const body: createuser = req.body
//     genSalt()
//         .then(response => hash(body.password, response))
//         .then(response => User.create({ ...body, password: response }))
//         .then(() => res.status(200).json({
//             msg: "usuario creado"
//         }))
//         .catch(err => res.status(500).json(err))
// })

//todo: creando y hash antes del modelo
route.post("/create", (req: Request, res: Response) => {
    const body: createuser = req.body
    User.create(body)
        .then(() => res.status(200).json({
            msg: "usuario creado"
        }))
        .catch(err => res.status(500).json(err))
})

export default route