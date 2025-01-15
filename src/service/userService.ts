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
    findUserByEmailAddress: (emailAddress: string, select: string = '') => {
        return userModal.findOne({ emailAddress }).select(select)
    },
    findUserById: (userId: string) => {
        return userModal.findById(userId)
    },
    registerUser: (payload: UserResponseBodyType) => {
        return userModal.create(payload)
    },
    findUserByConfimationTokenAndCode: (token: string, code: string) => {
        return userModal.findOne({
            'accountConfirmation.token': token,
            'accountConfirmation.code': code
        })
    },
    findAllUser: async (skip?: number, limit?: number, sortBy?: string, sortOrder: 'asc' | 'desc' = 'asc') => {
        let count: number
        let data: any[]

        const sortObject: any = {}
        if (sortBy) {
            sortObject[sortBy] = sortOrder === 'asc' ? 1 : -1
        }

        //         Collation: The collation option allows you to specify how MongoDB should sort string data. In this case, we set strength: 2 for case-insensitive sorting, meaning rahul and Ankit will be treated equally for sorting purposes.
        // Locale: The locale: 'en' part ensures that the sorting follows English-language rules, which is commonly used for sorting.

        const collation = { locale: 'en', strength: 2 } // 'strength: 2' is for case-insensitive sorting


        if (skip !== undefined && limit !== undefined && limit > 0) {
            count = await userModal.find().skip(skip).limit(limit).countDocuments() // Count based on limit and offset
            data = await userModal.find().skip(skip).limit(limit).collation(collation).sort(sortObject).exec() // Fetch data with pagination
        } else {
            count = await userModal.countDocuments() // Total count
            data = await userModal.find().collation(collation).sort(sortObject).exec() // Fetch all data without pagination
        }
        return { count, data } // Return both count and data
    }
}

