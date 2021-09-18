import contact from "../models/contacts";
import post from "../models/userPosts";
import photo from "../models/photos";

import {IBackgroundSummary} from "./background.interface";
import {IFriendSummary} from "./userFriend.interface";
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


export interface IUserInfoSummary {

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
    }
}

/**
 * interface to set user in local storage
 */
export interface IUserInfo extends IUserInfoSummary {

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

export interface IAllInfoUser extends IUserInfoSummary {

    contacts: {
        email?: string,
        phoneNumber?:string,
        skype?: string,
        github?: string,
        linkedin?: string,
    },
    posts: Array<post>,
    //photos: Array<photo>,
    friends: Array<IFriendSummary>
    backgrounds: Array<IBackgroundSummary>
}

export interface IUserProfileUpdate {

    firstName?: string,
    lastName?: string,
    birthDay?: Date,
    gender?: string,
    email?: string,
    phoneNumber?:string,
    github?: string,
    linkedin?: string,
    skype?: string,
}