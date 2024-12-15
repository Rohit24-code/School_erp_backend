import mongoose from 'mongoose'
import config from '../config/config'

export default {
    connect: async () => {
        // eslint-disable-next-line no-useless-catch
        try {
            await mongoose.connect(config.DATABASE_URL as string)

            return mongoose.connection
        } catch (error) {
            throw error
        }
    }
}
