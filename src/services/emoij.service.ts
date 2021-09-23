import db from "../models/index";

import { Op } from "sequelize";
import Emoij from "../models/emoij";
import { IUpdateEmoij } from "../interfaces/emoij.interface";

import { EMOIJ } from "../constants/emoji.constant";


/**
 * 
 * @param {number} postId 
 * @param {number} userId 
 * @returns {Promise<Emoij | nulL>}
 */
const findEmoijByUserAndPostId = async (postId: number, userId: number): Promise<Emoij | null> => {

    return await Emoij.findOne({
        where: {
            postId: postId,
            userId: userId
        }
    })
}

/**
 * Create Emoij for post, all emoijs are set to null
 * @param {number} postId
 * @param {number} userId 
 */
const createEmoij = async (userId: number, postId: number, updateBody: IUpdateEmoij) => {

  
    await Emoij.create({
        postId: postId,
        userId: userId,
        type: updateBody.type,
    })
}

/**
 * update Emoij
 * @param {number} postId 
 * @param {number} updateBody 
 * @return {Promise<Boolean>} inc(1) or dec(0) total emoij
 */
const updateEmoij = async (userId: number, postId: number, updateBody: IUpdateEmoij): Promise<Boolean> => {

    const emoij: Emoij | null = await findEmoijByUserAndPostId(userId, postId);

    if (!emoij) {
        await createEmoij(userId, postId, updateBody);
        return true;
    }

    if (emoij.type === updateBody.type) {
        updateBody.type = EMOIJ.NONE;

    }

    await Emoij.update(
        updateBody,
        {
            where: {
                userId: userId,
                postId: postId,
            }
        });

    return (updateBody.type === EMOIJ.NONE) ? false : true;
}



export default {
    createEmoij,
    updateEmoij,
}
