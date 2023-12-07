import { blacklist } from "controllers/types/Balcklist"
import { Schema, model } from "mongoose"

const BlacklistSchema = new Schema<blacklist>(
    {
        token: {
            type: String,
            require: true,
            ref: "Users"
        }
    },
    { timestamps: true }
)


const Blacklist = model<blacklist>("Blacklist", BlacklistSchema)

export default Blacklist