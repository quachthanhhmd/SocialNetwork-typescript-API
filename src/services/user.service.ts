import User from "../models/user";
import userProfileService from "./userProfile.service";

import { CreateUserProfile } from "../interfaces/user.interface";
import UserError from "../constants/apiError/user.contant";

/**
 * FIND USER BY ID
 * @param {number} id 
 * @returns {<Promise>User} 
 */
const findUserById = async (id: number): Promise<User | null> => {

    return await User.findOne({
        where: {
            id: id,
        }
    })
}


/**
 * FIND USER BY USERNAME
 * @param {string} username 
 * @returns {Promise<User>} 
 */
const findUserbyUsername = async (username: string): Promise<User | null> => {

    return await User.findOne({
        where: {
            username: username,
        }
    })
}


type createUserAttributes = {
    firstName: string,
    lastName: string,
    birthDay: Date,
    gender: string,
    username: string,
    password: string,
}

/**
 * CREATE USER WHEN REGISTERING
 * @param user 
 * @returns {Promise<createUserAttributes>}
 */
const createUser = async (user: createUserAttributes): Promise<User | null> => {

    //Check user exist in DB
    const checkUserExist = await findUserbyUsername(user.username);

    if (checkUserExist) throw UserError.UsernameExist;

    //Create User
    const createUser = await User.create({
        username: user.username,
        password: user.password,
    })


    if (!createUser) {
        throw UserError.CreateUserFailed;
    }

    const userProfile: CreateUserProfile = {
        firstName: user.firstName,
        lastName: user.lastName,
        gender: user.gender,
        birthDay: new Date(user.birthDay),
        userId: createUser.id,
    }

    userProfileService.createUserProfile(userProfile);


    return createUser;
}

export default {
    findUserById,
    findUserbyUsername,
    createUser
}