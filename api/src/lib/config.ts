
import dotenv from 'dotenv';

dotenv.config();

const config = {
    dbUser: process.env.DB_USER || 'userAdmin',
dbPassword: process.env.DB_PASSWORD || 'Superadmin',
    dbHost: process.env.DB_HOST || 'localhost',
    dbName: process.env.DB_NAME || 'portfolio',
    dbPort: process.env.DB_PORT || '27017',
       dev: process.env.NODE_ENV !== 'production',
      port: process.env.API_PORT || '3001',
      host: process.env.API_host || 'localhost',
      cors: process.env.CORS || 'localhost:3000',
PrivetKey1: process.env.PRIVATE_KEY1 || "",
 autSource:process.env.AUTH_SOURCE || "admin"
}

export default config;