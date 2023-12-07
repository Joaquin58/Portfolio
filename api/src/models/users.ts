import { model, Schema, ObjectId } from "mongoose"
import { hash, genSalt, compare } from "bcrypt"
import { UserModel, IUser, IUserMethods } from "controllers/types/users"
import jwt from "jsonwebtoken"
import config from "../lib/config"
import { error, info } from "console"

const usersSchema = new Schema<IUser, UserModel, IUserMethods>(
    {
        firstname: {
            type: String,
            require: true,
            unique: true
        },
        lastname: {
            type: String,
            require: true,
            unique: true
        },
        username: {
            type: String,
            require: true,
            unique: true
        },
        password: {
            type: String,
            require: true,
            select:false
        },
        email: {
            type: String,
            require: true
        },
        role: {
            type: String,
            require: true,
            default: "0x01"
        }

    })

usersSchema.pre<IUser>("save", async function (next) {
    const user = this as IUser;
    if (!user.isModified("password")) {
        return next()
    }
    try {
        const salt = await genSalt(10);
        const hashedPassword = await hash(user.password, salt);
        user.password = hashedPassword;

        next()

    } catch (error: any) {
        return next(error)
    }

})

usersSchema.method("login", async function login(candidatePassword: string): Promise<boolean> {
    const hash = await compare(candidatePassword, this.password)
    return hash
})

usersSchema.method("generateAccessJWT", function generateAccessJWT() {
    let userForToken: { id: ObjectId, username: string, role: string } = {
        id: this._id,
        username: this.username,
        role: this.role
    }
    if (config.PrivetKey1.length === 0)  throw error("Credenciuales no proporcionadas: ProvateKey")
   
    return jwt.sign(userForToken, config.PrivetKey1, {
        expiresIn: 60 * 60 * 9,
    })
})
const Users = model<IUser, UserModel>("Users", usersSchema)

export default Users