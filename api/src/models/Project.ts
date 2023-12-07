import { ProyectDocument } from "controllers/types/project";
import mongoose, { Document, Schema } from "mongoose";

const proyectoSchema = new Schema<ProyectDocument>({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    url: String,
    tecnologias: [
        {
            nombre: { type: String, required: true },
            version: String,
            categoria: String,
        },
    ],
    cliente: {
        nombre: String,
        empresa: String,
        contacto: String
    },
    fecha_inicio: { type: Date, required: true },
    fecha_fin: Date,
    capturas_pantalla: [String],
    etiquetas: [String],
    proyecto_destacado: { type: Boolean, default: false },
    autor: {
        type: Schema.Types.ObjectId,
        ref: "Users",
    }
});

const Proyecto = mongoose.model<ProyectDocument>("Proyecto", proyectoSchema);

export default Proyecto