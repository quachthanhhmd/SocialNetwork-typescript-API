import { Op } from 'sequelize';
import Friend from "../models/userFriends";

import FriendError from "../constants/apiError/friend.constant";

import {STATUS} from "../constants/friendStatus.constant";

const findFriendById = async (userId: number, parnerId: number) => {


    return await Friend.findOne({
        where: {
            [Op.or]: [
                {
                    [Op.and]: [
                        { userId: userId, },
                        { friendId: parnerId, }
                    ]
                },
                {
                    [Op.and]: [
                        { userId: parnerId, },
                        { friendId: userId, }
                    ]
                },
            ]
        }
    })
}

interface ICreateFriend extends IStateFriend {
    userId: number,
    friendId: number,
}

const createRelationship = async (bodyCreate: ICreateFriend): Promise<void> => {

    await Friend.create(bodyCreate);
}

interface IStateFriend {

    status?: string,
    isFollow?: Boolean,
}

/**
 * Update realationship based on id and state which need to update
 * @param {number} userId 
 * @param {number} parnerId 
 * @param {IStateFriend} stateOfFriend
 * @return {Promise<void>} 
 */
const updateRelationship = async (userId: number, parnerId: number, stateOfFriend: IStateFriend): Promise<void> => {

    Friend.update(
        stateOfFriend
    , {
        where: {
            [Op.or]: [
                {
                    [Op.and]: [
                        { userId: userId, },
                        { friendId: parnerId, }
                    ]
                },
                {
                    [Op.and]: [
                        { userId: parnerId, },
                        { friendId: userId, }
                    ]
                },
            ]
        }
    })
}

/**
 * Send requet for other user
 * Be sure to userId and parnerId exist In DB
 * @param userId 
 * @param parnerId 
 */
const sendRequestFriend = async (userId: number, parnerId: number): Promise<void> => {

    const relationship = await findFriendById(userId, parnerId);

    if (relationship && relationship.status !== STATUS.NOTHING) throw FriendError.FriendExist;

    //if relationship does not exist
    if (!relationship) {
        await createRelationship({
            userId: userId,
            friendId: parnerId,
            isFollow: true,
            status: STATUS.SPENDING
        });
    }
    
}

/**
 * Accept request friend
 * Be sure to userId and parnerId exist 
 * @param {number} userId 
 * @param {number} parnerId
 * @return {Promise<void>} 
 */
const acceptRequestFriend = async (userId: number, parnerId: number): Promise<void> => {

    const relationship: Friend | null = await findFriendById(userId, parnerId);

    //realationship can not be null since it muse be send a request befor
    if (!relationship) throw FriendError.FriendNotFound;

    //userId muse be different with userId because it will be definite that user is not self-acceptable
    if (relationship.userId === userId)
        throw FriendError.UnSelfAccept;

    if (relationship && relationship.status === STATUS.ACCEPT) throw FriendError.FriendExist;

    if (relationship.status !== STATUS.SPENDING)
        throw FriendError.FriendNotFound;

    await updateRelationship(userId, parnerId, {status: STATUS.ACCEPT});

}

const changeFollow = async (userId: number, parnerId: number) : Promise<void> =>{

    const relationship: Friend | null = await findFriendById(userId, parnerId);

    if (!relationship){
        await createRelationship({
            userId: userId,
            friendId: parnerId,
            isFollow: true,
        })
        return;
    }
    
    if (relationship.userId === userId) throw FriendError.UnSelfAccept;

    await updateRelationship(userId, parnerId, {isFollow: !relationship.isFollow});
}

export default {
    sendRequestFriend,
    acceptRequestFriend,
    changeFollow
}