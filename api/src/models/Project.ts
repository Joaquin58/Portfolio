import { prop, getModelForClass } from '@typegoose/typegoose'

class Project {

    @prop({ require: true }) //propiedades de monsose
    title!: string //propiedades de typescript

    @prop()
    url!: string

    @prop()
    features!: string

    @prop({ require: true })
    description!: string
}

const projectModel = getModelForClass(Project)

export default projectModel