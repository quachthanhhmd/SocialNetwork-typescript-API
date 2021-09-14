import UserProfile from "../models/userProfile";

import { CreateUserProfile } from "../interfaces/user.interface";

import ApiError from "../constants/apiError/user.contant";

/**
 * 
 * @param {CreateUser} userProfileCreate 
 * @returns {Promise<CreateUser>} 
 */
const createUserProfile = async (userProfileCreate: CreateUserProfile): Promise<UserProfile> => {

    const userProfile = await UserProfile.create(userProfileCreate);

    if (!userProfile) throw ApiError.CreateUserFailed;

    return userProfile;
}

export default {
    createUserProfile
}