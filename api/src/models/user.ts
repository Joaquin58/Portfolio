import { prop, getModelForClass, pre, types, PropType, DocumentType, ReturnModelType } from '@typegoose/typegoose'
import { genSalt, compare, hash } from "bcrypt"

// @pre<User>('save', async function (next) {
//     const salt = await genSalt()
//     this.password = await hash(this.password, salt)
//     next()
// })
//! agregar el metodo de comparacion

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

    // static async _comp(this: DocumentType<User>, password: string) {
    //     const fullfided = await compare(password, this.password)
    //     return fullfided
    // }
    // public async login(this: ReturnModelType<typeof User>, password: string) {
    //     const isadmin: boolean = this._comp()
    // }
    public async login({ password }: { password: string }): Promise<boolean> {
        const hash = await compare(password, this.password)
        return hash
    }
}

const userModel = getModelForClass(User)

export default userModel