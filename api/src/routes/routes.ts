import { Router } from 'express'
import admin from "../controllers/admin"
import projects from "../controllers/proyects"
import users from "../controllers/users"
const app = Router()

app.use("/admin", admin)

app.use("/users", users)

app.use("/projects", projects)

export default app