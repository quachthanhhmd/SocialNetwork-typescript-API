import httpStatus from "http-status";

import ApiError from "../utils/ApiError";

//need to use include when query
import db from "../models/index";

import UserError from "../constants/apiError/user.contant";
import userProfileService from "./userProfile.service";
import contactService from "./contact.service";
import friendService from "./friend.service";

import User from "../models/user";

import { comparePasswordHash } from './../config/bcrypt';

import { CreateUserProfile, IUserUpdate, IUserProfileUpdate } from "../interfaces/user.interface";
import { IAllInfoUser } from "../interfaces/user.interface";

import { EMOIJ } from "../constants/emoji.constant";
import { Op } from "sequelize";


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


    await User.update(
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
const ChangePasswordById = async (userId: number, password: string): Promise<void> => {

    await User.update(
        { password: password },
        {
            where: {
                id: userId,
            }
        }
    )
}

/**
 * Get all information of a user
 * @param userId 
 */
const getFullUserInfo = async (userId: number): Promise<User | null> => {


    //net to split friend to decline the number of join table
    //let fullInfoUser:IAllInfoUser = {};
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

            include: [{

                model: db.Contact,
                as: "contacts",
                attributes: ['email', 'phoneNumber', 'skype', 'github', 'linkedin'],
                //required: false

            }],

            //required: false
        }, {
            model: db.UserPost,
            as: "posts",
            //required: false
        }, {
            model: db.UserBackground,
            as: "backgrounds",
            attributes: ['id', 'status', 'link', 'type', 'name'],
            //required: false
        }],
        nest: true,
        raw: true,
    });

    const userFriend = await User.findOne({
        where: {
            id: userId
        },
        include: [{
            model: db.UserFriend,
            where: {
                userId: userId
            },

            required: true,
        },
        {
            model: db.UserProfile,
            as: "profile",
            where: {
                userId: '$UserFriend.friendId$',
            },
            required: true,
        }]
    })

    Object.assign(userInfo, userFriend)


    return userInfo;
}


const updateAllInformation = async (id: number, updateBody: IUserProfileUpdate) => {


    //update contacts
    await userProfileService.updateProfileById(id, updateBody);

    // find this profile;
    const profile = await userProfileService.findProfileByUserId(id);

    if (!profile) throw UserError.UserNotFound;

    console.log(profile);
    await contactService.updateContactByProfileId(profile.id, updateBody);
}

/**
 * Update image by user Id ----- using id, file, name and folder to save file and upload
 * @param {number}userId 
 * @param {any} file 
 * @param {string} name 
 * @param {string} folder 
 */
const updateImageUser = async (userId: number, file: any, name: string, folder: string) => {

    const user = await findUserById(userId);


    if (!user) throw UserError.UserNotFound;

    await userProfileService.updateUserProfileImage(userId, file, name, folder);
}

/**
 * Send requet friend 
 * @param {number} userId 
 * @param {number} parnerId
 * @return {Promise<void>} 
 */
const sendRequestFriend = async (userId: number, parnerId: number): Promise<void> => {

    const parner = findUserById(parnerId);

    if (!parner) throw UserError.UserNotFound;

    await friendService.sendRequestFriend(userId, parnerId);
}

/**
 * user who has been received a request will accept to become friends each other.
 * @param {number} userId 
 * @param {number} parnerId
 * @return {Promise<void>} 
 */
const acceptRequetFriend = async (userId: number, parnerId: number): Promise<void> => {

    const parner = findUserById(parnerId);

    if (!parner) throw UserError.UserNotFound;

    await friendService.acceptRequestFriend(userId, parnerId);
}

/**
 * Refuse the friend request by User Id
 * @param {number} userId 
 * @param {number} parnerId 
 * @return {Promise<void>}
 */
const refuseFriendRequest = async (userId: number, parnerId: number): Promise<void> => {

    const parner = findUserById(parnerId);

    if (!parner) throw UserError.UserNotFound;

    await friendService.refuseFriend(userId, parnerId);
}

/**
 * Change state of follow
 * @param {number} userId 
 * @param {number} parnerId
 * @return {Promise<void>} 
 */
const changeFollow = async (userId: number, parnerId: number): Promise<void> => {

    const parner = findUserById(parnerId);

    if (!parner) throw UserError.UserNotFound;

    await friendService.changeFollow(userId, parnerId);

}

/**
 * 
 * @param {number} postId 
 * @returns {Promise<Array<User> | null>}
 */
const findEmoijUserList = async (postId: number): Promise<Array<User> | null> => {

    return await db.User.findAll({
        attributes: ["id"],
        include: [
            {
                model: db.UserProfile,
                as: "profile",
                attributes: ["firstName", "lastName", "avtImage"],
            },
            {
                model: db.Emoij,
                where: {
                    postId: postId,
                    type: {
                        [Op.not]: EMOIJ.NONE,
                    }
                },
                required: false,
                right: true,
                attributes: ["type"],
            }],
        raw: true,
        nest: true
    })
}


export default {
    findUserById,
    findUserbyUsername,
    createUser,
    isPasswordMatch,
    getInfoOfUser,
    updateUser,
    ChangePasswordById,
    getFullUserInfo,
    updateAllInformation,
    updateImageUser,
    sendRequestFriend,
    acceptRequetFriend,
    refuseFriendRequest,
    changeFollow,
    findEmoijUserList
}