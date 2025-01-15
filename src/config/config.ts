import dotenvFlow from 'dotenv-flow'

dotenvFlow.config()

export default {
    ENV: process.env.ENV,
    PORT: process.env.PORT,
    SERVER_URL: process.env.SERVER_URL,
    DATABASE_URL: process.env.DATABASE_URL,
    FRONTEND_URL: process.env.FRONTEND_URL,
    EMAIL_SERVICE_API_KEY: process.env.EMAIL_SERVICE_API_KEY,
    ACCESS_TOKEN:{
        ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
        EXPIRY: 3600 *24 *365
    },
    REFRESH_TOKEN:{
        REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
        EXPIRY: 3600 * 24 * 365
    }
}
