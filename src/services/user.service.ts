import httpStatus from "http-status";

import ApiError from "../utils/ApiError";

//need to use include when query
import db from "../models/index";
import UserError from "../constants/apiError/user.contant";
import userProfileService from "./userProfile.service";
import User from "../models/user";

import { comparePasswordHash } from './../config/bcrypt';
import { CreateUserProfile, IUserUpdate } from "../interfaces/user.interface";



/**
 * Check match in password
 * @param {User} user 
 * @param {string} password 
 * @returns {Boolean}
 */
const isPasswordMatch = (user: User, password: string) => {

    if (comparePasswordHash(user.password, password)) return true;

    return false;
}

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


    await userProfileService.createUserProfile(userProfile);



    return createUser;
}


const getInfoOfUser = async (userId: number) => {

    const userInfo = await db.User.findOne({

        where: {
            id: userId,
        },
        attributes: [
            "id",
            "username",
            //[sequelize.literal('"User".UserProfile""'), 'profile']
        ],
        include: [{
            model: db.UserProfile,
            as: "profile",
            attributes: ['id', 'firstName', 'lastName', 'displayName', 'backgroundImage', "avtImage", 'birthDay', 'gender'],
        }],
        nest: true,
        raw: true,
    });

    if (!userInfo) throw UserError.UserNotFound;

    return userInfo;
}


/**
 * Update User table
 * @param {number} userId 
 * @param {IUserUpdate} updateObject
 * @return {Promise<void>}
 */
const updateUser = async (userId: number, updateObject: IUserUpdate): Promise<void> => {


    const user = await User.update(
        updateObject,
        {
            where: {
                id: userId,
            }
        })
        .catch(error => {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
        })

  
}

/**
 * Change password by userId  
 * @param {number} userId 
 * @param {string} password 
 * @return {Promise<void>}
 */
const ChangePasswordById = async (userId :number, password: string) : Promise<void> =>{

    await User.update(
        {password: password},
        {
            where: {
                id: userId,
            }
        }
    )
}

export default {
    findUserById,
    findUserbyUsername,
    createUser,
    isPasswordMatch,
    getInfoOfUser,
    updateUser,
    ChangePasswordById
}