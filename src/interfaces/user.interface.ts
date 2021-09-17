
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


/**
 * interface to set user in local storage
 */
export interface IUserInfo {

    id: number,
    username: string,
    profile: {
        id?: number,
        firstName: string,
        lastName: string,
        backgroundImage?: string | null,
        gender: string,
        birthDay: Date,
        lastLogin?: Date | null,
        avtImage?: string | null,
        displayName?: string,
    },
    access?: {
        token: string,
        expire: moment.Moment,
    }, 
    expire?: {
        token: string,
        expire: moment.Moment,
    }
}

export interface IUserUpdate {

    isVerified?: Boolean,
    password?: string,
}

export interface IUser {

    id: number,
    password: string,
    isVerified: string,
    username: string,
}