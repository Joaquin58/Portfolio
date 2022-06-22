import { prop, getModelForClass } from '@typegoose/typegoose'

class User {

    @prop({ require: true }) //propiedades de monsose
    firstname!: string //propiedades de typescript

    @prop()
    lastname!: string

    @prop()
    email!: string

    @prop({ require: true })
    password!: string
}

const userModel = getModelForClass(User)

export default userModel