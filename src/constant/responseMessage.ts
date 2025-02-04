export default {
    SUCCESS: 'Data has been fetched successfully !',
    SOMETHING_WENT_WRONG: 'Something went wrong !',
    NOT_FOUND: (entity: string) => `${entity} not found !`,
    TOO_MANY_REQUESTS: 'Too many requests! please try again after some time',
    INVALID_PHONE_NUMBER: 'Invalid phone number !',
    ALREADY_EXISTS: (entity: string, identifier: string) => {
        return `${entity} is already exits with ${identifier}!`
    },
    INVALID_ACCOUNT_CONFIRMATION_TOKEN_OR_CODE: `Invalid account confirmation token or code`,
    INVALID_USERNAME_OR_PASSWORD:`Invalid username or password`,
    ACCOUNT_ALREADY_CONFIRMED: `Account already confirmed`,
    USER_AUTHENTICATION_SUCCESS: `User has been authenticated successfully`,
    USER_REGISTERED_SUCCESS: `User has been registered successfully`,
    USER_UNAUTHORIZED:`You are not authorized`,
    DELETED_SUCCESSFULLY:`Data has been deleted successfully`,
    UPDATED_SUCCESSFULLY:`Data has been updated successfully`,
    UPLOADED_SUCCESSFULLY:`Data has been uploaded successfully`,

}
