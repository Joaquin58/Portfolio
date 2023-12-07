import { Document } from "mongoose"


interface blacklist extends Document {
    token: string,
    
}