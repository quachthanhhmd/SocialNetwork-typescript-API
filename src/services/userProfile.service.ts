import pick from "../utils/pick";

import UserProfile from "../models/userProfile";

import { CreateUserProfile } from "../interfaces/user.interface";

import {IUserProfile} from "../interfaces/userProfile.interface";

import ApiError from "../constants/apiError/user.contant";



/**
 * Pick feild from any object to user profile
 * @param {object} anyObject 
 * @returns IUserProfile
 */
const pickFeildOfProfile = (anyObject: object) :IUserProfile=>{

    return pick(anyObject, ['firstName', 'lastName', 'gender', 'birthDay'])
}
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

/**
 * Update profile by UserId
 * @param {number}id 
 * @param {object}updateBody 
 * @returns 
 */
const updateProfileById = async (id: number, updateBody: object) => {

    //get field for update
    const userProfileObject: IUserProfile = pickFeildOfProfile(updateBody);
    console.log(typeof userProfileObject.birthDay);
    return await UserProfile.update(
            userProfileObject
        ,{
            where: {
                userId: id,
            }
        })

}


/**
 * 
 * @param userId 
 * @returns 
 */
const findProfileByUserId = async (userId: number) : Promise<UserProfile | null> => {

    return await UserProfile.findOne({
        where: {
            userId: userId,
        }
    })
}

export default {
    createUserProfile,
    updateProfileById,
    findProfileByUserId
}