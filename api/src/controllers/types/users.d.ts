import { Document, SchemaOptions, Model } from "mongoose"

interface IUser extends Document {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
    role: string;
}

interface IUserMethods {
    login(candidatePassword: string): Promise<boolean>;
    generateAccessJWT():string;
}


type UserModel = Model<IUser, {},IUserMethods>