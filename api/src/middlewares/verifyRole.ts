import { Response, NextFunction } from "express";
import { idRequest } from "../controllers/types/req";

const verifyRole = (req: idRequest, res: Response, next: NextFunction) => {
    try {
        const { role } = req
        if (role !== "0x88") {
            return res.status(401).json({
                status: "failed conection",
                message: "You are not authrized to view this page"
            });
        }
        next()
    } catch (error) {
        res.status(500).json({
            status:"error",
            error
        })
    }
}

export default verifyRole