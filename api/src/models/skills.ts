import { model, Schema } from "mongoose"

const skillSchema = new Schema({
    name: { type: String, required: true, unique: true },
    tipo: { type: String, unique: true }
})

const skills = model("skills", skillSchema)