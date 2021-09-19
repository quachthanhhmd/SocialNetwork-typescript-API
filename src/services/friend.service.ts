import { Op } from 'sequelize';
import Friend from "../models/userFriends";

import FriendError from "../constants/apiError/friend.constant";


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

/**
 * Send requet for other user
 * Be sure to userId and parnerId exist In DB
 * @param userId 
 * @param parnerId 
 */
const sendRequestFriend = async (userId: number, parnerId: number): Promise<void> => {

    const relationship = await findFriendById(userId, parnerId);

    if (relationship) throw FriendError.FriendExist;

    Friend.create({
        userId: userId,
        friendId: parnerId,
        isFollow: true,
    });
}

/**
 * Accept request friend
 * Be sure to userId and parnerId exist 
 * @param {number} userId 
 * @param {number} parnerId
 * @return {Promise<void>} 
 */
const acceptRequestFriend = async (userId: number, parnerId: number): Promise<void> => {

    const relationship : Friend | null = await findFriendById(userId, parnerId);

    if (relationship && relationship.isAccepted) throw FriendError.FriendExist;

    Friend.update({
        isAccepted: true,
    }, {
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

export default {
    sendRequestFriend,
    acceptRequestFriend,
}