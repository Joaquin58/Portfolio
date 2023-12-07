import { model, Schema } from "mongoose"
import tecnologias from "controllers/types/tecnologias"

const tecnologiasSchema = new Schema<tecnologias>({
    nombre: { type: String, require: true, unique: true },
    version: { type: String },
    categoria: { tpe: String, unique: true }
})

const tecnologias = model<tecnologias>("tecnologias", tecnologiasSchema)