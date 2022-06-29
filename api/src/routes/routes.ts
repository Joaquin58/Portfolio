import { Router } from 'express'
import admin from "../controllers/admin"
import projects from "../controllers/proyects"
const app = Router()

// app.get("/", (req: Request, res: Response) => {
//     User.find({}, { email: 1, firstname: 1, _id: 0 })
//         .then((response) => res.status(200).json(response))
//         .catch((err) => res.status(500).json(err))
// })

// app.post("/", (req: Request, res: Response) => {
//     try {
//         const user = new User(req.body)
//         user.save()
//         console.log(user)
//         res.status(200).json(user)
//     } catch (err) {
//         res.status(500).send(err)
//     }
// })

app.use("/admin", admin)

app.use("/projects", projects)

export default app