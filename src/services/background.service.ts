import Background from "../models/userBackground";

import { IBackgroundCreate, IBackgroundUpdate } from "../interfaces/background.interface";

/**
 * Check wonder if one background belongs to user or not
 * @param {number} userId 
 * @param {number} backgroundId 
 * @returns {Promise<Boolean>}
 */
const checkBelongsto = async (userId: number, backgroundId: number): Promise<Boolean> => {

    const background = await Background.findOne({
        where: {
            id: backgroundId,
        }
    });

    if (!background) return false;

    return background.userId === userId ? true : false;
}

/**
 * FInd a background of user by Id
 * @param {number} id 
 * @returns {Promise<Background | null>}
 */
const findBackgroundById = async (id: number): Promise<Background | null> => {

    return await Background.findOne({
        where: {
            id: id,
        }
    })
}

/**
 * Create a background for user
 * @param createBody 
 */
const createBackground = async (userId: number, createBody: IBackgroundCreate): Promise<Background> => {

    Object.assign(createBody, { userId: userId });
    return await Background.create(createBody);
}

/**
 * Update background for user 
 * @param {number} userId 
 * @param {IBackgroundUpdate} updateBody 
 */
const updateBackground = async (id: number, updateBody: IBackgroundUpdate): Promise<void> => {

    await Background.update(
        updateBody,
        {
            where: {
                id: id,
            }
        }
    )
}


const deleteBackground = async (backgroundId: number) => {

    const background = await findBackgroundById(backgroundId);

    if (!background) return;

    await Background.destroy({
        where: {
            id: backgroundId,
        }
    })
}

/**
 * Find all background of user
 * @param {number} userId
 * @return {Promise<Array<Background> | null>} 
 */
const findAllBackground = async (userId: number): Promise<Array<Background> | null> => {

    return await Background.findAll( {
        where: {
            userId: userId
        }
    })
    

}

export default {
    createBackground,
    updateBackground,
    checkBelongsto,
    deleteBackground,
    findAllBackground
}

