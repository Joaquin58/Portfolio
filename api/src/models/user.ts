import { prop, getModelForClass, pre, types, PropType, DocumentType, ReturnModelType } from '@typegoose/typegoose'
import { genSalt, compare, hash } from "bcrypt"

@pre<User>('save', async function (next) {
    const salt = await genSalt()
    this.password = await hash(this.password, salt)
    next()
})

class User {

    @prop({ require: true }) //propiedades de monsose
    firstname!: string //propiedades de typescript

    @prop()
    lastname!: string

    @prop()
    username!: string

    @prop()
    email!: string

    @prop({ require: true })
    password!: string

    public async login({ password }: { password: string }): Promise<boolean> {
        const hash = await compare(password, this.password)
        return hash
    }
}

const userModel = getModelForClass(User)

export default userModel