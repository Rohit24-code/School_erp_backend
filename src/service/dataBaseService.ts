import mongoose from 'mongoose'
import config from '../config/config'
import userModal from '../modal/userModal'
import { UserResponseBodyType } from '../types/userTypes'

export default {
    connect: async () => {
        // eslint-disable-next-line no-useless-catch
        try {
            await mongoose.connect(config.DATABASE_URL as string)

            return mongoose.connection
        } catch (error) {
            throw error
        }
    },
    findUserByEmailAddress: (emailAddress: string) => {
        return userModal.findOne({ emailAddress })
    },
    registerUser: (payload: UserResponseBodyType) => {
        return userModal.create(payload)
    },
    findUserByConfimationTokenAndCode: (token: string, code: string) => {
        return userModal.findOne({
            'accountConfirmation.token': token,
            'accountConfirmation.code': code
        })
    }
}
