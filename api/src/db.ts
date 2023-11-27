import mongoose from "mongoose"
import config from "./lib/config"

export const Mongoosedb = mongoose.connect(`mongodb://${config.dbUser}:${config.dbPassword}@${config.dbHost}:${config.dbPort}/${config.dbName}?authSource=${config.autSource}`)