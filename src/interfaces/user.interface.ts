
/**
 *  interface to manage feild when registering
 */
export interface CreateUserProfile {
    firstName: string,
    lastName: string,
    birthDay: Date,
    gender: string,
    userId: number,
}

export interface IUserInfo {

    id: number,
    username: string,
    profile: {
        firstName: string,
        lastName: string,
        birthDay: Date,
        gender: string,
    }  
}