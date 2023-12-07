import mongoose, { Document, Schema } from "mongoose";
import {Tecnologias} from "controllers/types/tecnologias"


interface Cliente {
    nombre?: string;
    empresa?: string;
    contacto?: string;
}

interface ProyectDocument extends Document {
    nombre: string;
    descripcion: string;
    url?: string | Boolean;
    tecnologias: Tecnologias[];
    cliente?: Cliente;
    fecha_inicio: Date;
    fecha_fin?: Date | Boolean;
    capturas_pantalla?: string[];
    etiquetas?: string[];
    proyecto_destacado?: boolean;
    autor: Schema.Types.ObjectId
}