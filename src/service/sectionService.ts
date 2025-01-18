import sectionModal from "../modal/sectionModal"

export default {
    findAllSection: async (skip?: number, limit?: number, sortBy?: string, sortOrder: 'asc' | 'desc' = 'asc') => {
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
            count = await sectionModal.find().skip(skip).limit(limit).countDocuments() // Count based on limit and offset
            data = await sectionModal.find().skip(skip).limit(limit).collation(collation).sort(sortObject).exec() // Fetch data with pagination
        } else {
            count = await sectionModal.countDocuments() // Total count
            data = await sectionModal.find().collation(collation).sort(sortObject).exec() // Fetch all data without pagination
        }
        return { count, data } // Return both count and data
    },
    findByIdAndUpdate:(id:string,updates:Object)=>{
        return   sectionModal.findByIdAndUpdate(
             id,
             updates,
             {
               new: true, // Return the updated document
               runValidators: true, // Ensure the updates follow schema validation
             }
           )
     },
     findById:(id:string)=>{
        return sectionModal.findById(id)
     } ,
        findSectionById: (userId: string) => {
        return sectionModal.findById(userId)
    },
    findByIdAndDelete:async(id:string)=>{
        const deletedDocument = await sectionModal.findByIdAndDelete(id);
        return deletedDocument;
    }
}