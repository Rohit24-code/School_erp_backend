export default {
    SUCCESS: 'Data has been fetched successfully !',
    SOMETHING_WENT_WRONG: 'Something went wrong !',
    NOT_FOUND: (entity: string) => `${entity} not found !`,
    TOO_MANY_REQUESTS:'Too many requests! please try again after some time',
    INVALID_PHONE_NUMBER:'Invalid phone number !',
    ALREADY_EXISTS:(entity:string,identifier:string)=>{
       return  `${entity} is already exits with ${identifier}!`
    }
}
