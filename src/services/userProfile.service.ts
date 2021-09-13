import UserProfile from "../models/userProfile";

import { CreateUserProfile } from "../interfaces/user.interface";


/**
 * 
 * @param {CreateUser} userProfileCreate 
 * @returns {Promise<CreateUser>} 
 */
const createUserProfile = async (userProfileCreate: CreateUserProfile): Promise<UserProfile | null> => {

    return await UserProfile.create(userProfileCreate);
}

export default {
    createUserProfile
}