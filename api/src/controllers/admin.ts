import { Router, Request, Response, NextFunction, CookieOptions } from "express"
import Users from "../models/users"
import { auth, createuser } from "./types/auth"
import userExtractor from "../middlewares/userExtractor"
import { idRequest } from "./types/req"
import Blacklist from "../models/Blacklist"



const route = Router()

//todo: creando y hash antes del modelo
route.post("/create", (req: Request, res: Response) => {
    const body: createuser = req.body, { email, username }: createuser = req.body
    Users.findOne({ email, username })
        .then(payload => {
            if (!payload) return Users.create(body)
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
        .catch((err: any) => { res.status(500).json(err) })
})

//todo: crea el login pero el con la comparacion dentro del modelo y retorna un metodo nuevo de la instancia

route.post("/login", async (req: Request, res: Response) => {
    try {
        const { username, password }: auth = req.body
        const user = await Users.findOne({ username }).select("+password")
        if (!user) return res.status(401).json({
            error: "invalid user",
            status: "failed",
            message: "acount doesn't exist!",
            data: []
        })
        const passwordcorrect = await user.login(password)
        if (!passwordcorrect) return res.status(401).json({
            error: "password",
            status: "failed",
            data: [],
            message: "Invalid email or passwor. Please try again"
        })

        let options: CookieOptions = {
            maxAge: 20 * 60 * 1000,
            httpOnly: true,
            secure: true,
            sameSite: "none"
        }

        const token = user.generateAccessJWT()

        res.cookie("SessionID", token, options)
        res.status(200).json({
            status: "success",
            message: "You have successfully logged in."
        })
    } catch (error) {
        res.status(500).json({ message: "Internal Server error", error })
    }
})


route.get('/logoutheaders', userExtractor, (req: idRequest, res: Response) => {
    try {
        const authorization = req.get("authorization")
        let token = ""
        if (authorization && authorization.toLocaleLowerCase().startsWith('bearer')) {
            token = authorization.substring(7)
        }
        if (!token) {
            return res.status(401).json({ message: "Token no proporcioado" })
        }

        Blacklist.create({ token })
        res.json({ message: "logout exitoso" })
    } catch (error) {
        res.status(404).json(error)
    }
})

export default route