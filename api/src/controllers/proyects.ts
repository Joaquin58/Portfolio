import { Router, Response, Request } from "express"
import userExtractor from "../middlewares/userExtractor"
import { idRequest } from "./types/req"
const route = Router()
import Project from "../models/Project"
import { ProyectDocument } from "./types/project"
import verifyRole from "../middlewares/verifyRole"


route.post("/findprojects", userExtractor, verifyRole, async (req: idRequest, res: Response) => {
    // route.post("/findprojects", userExtractor, async (req: idRequest, res: Response) => {
    try {
        const { userId } = req


        Project.find({ autor: userId }).then((response) => {

            response.length === 0 ? res.status(404).json({ message: "Sin proyectos" }) : res.status(200).json({ proyects: response })
        })
    } catch (error: any) {

        return res.status(500).send(error)
    }
})

route.post("/post", userExtractor, (req: idRequest, res: Response) => {
    const propiedades: ProyectDocument = req.body
    const userId = req.userId
    userId && (propiedades.autor = userId)

    Project.create(propiedades).then((result) => {
        res.status(200).json(result)
    }).catch(error => {
        res.status(500).send(error)
    })
}
)

route.patch("/refresh", (req: Request, res: Response) => {
    try {

    } catch (error) {

    }

})

export default route