import studentModal from "../modal/studentModal"

export default {
    findUserByAadhar: (aadharCardNo: string) => {
        return studentModal.findOne({ aadharCardNo })
    },
    findByIdAndUpdate:(id:string,updates:Object)=>{
       return   studentModal.findByIdAndUpdate(
            id,
            updates,
            {
              new: true, // Return the updated document
              runValidators: true, // Ensure the updates follow schema validation
            }
          )
    },
    findAllStudent: async (skip?: number, limit?: number, sortBy?: string, sortOrder: 'asc' | 'desc' = 'asc') => {
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
            count = await studentModal.find().skip(skip).limit(limit).countDocuments() // Count based on limit and offset
            data = await studentModal.find().skip(skip).limit(limit).collation(collation).sort(sortObject).exec() // Fetch data with pagination
        } else {
            count = await studentModal.countDocuments() // Total count
            data = await studentModal.find().collation(collation).sort(sortObject).exec() // Fetch all data without pagination
        }
        return { count, data } // Return both count and data
    },
    findStudentById: (userId: string) => {
        return studentModal.findById(userId)
    },
    findByIdAndDelete:async(id:string)=>{
        const deletedDocument = await studentModal.findByIdAndDelete(id);
        return deletedDocument;
    }

}