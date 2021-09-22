import Photo from "../models/photos";


/**
 * Create photos for post
 * @param {number} postId 
 * @param {Array<string} fileList List of file need for post 
 * @returns Promise<Array<Photo> | null>
 */
const createPhoto = async (postId: number, fileList: Array<string>): Promise<Array<Photo> | null> => {

    console.log(fileList);
    if (fileList.length === 0)
        return null;

    for (const file of fileList) {

        await Photo.create({
            postId: postId,
            imageLink: file,
        })
    };


    return await Photo.findAll({
        where: {
            postId: postId,
        }
    })
}

/**
 * Delete all photos of post
 * @param postId 
 * @return {Promise<void>}
 */
const deleteAllPhoto = async (postId: number): Promise<void> =>{

    await Photo.destroy({
        where: {
            postId: postId,
        },
        truncate: true
    })
}

/**
 * Update information of post
 * @param {number} postId 
 * @param {Array<string>} fileList
 * @return {Promise<void>} 
 */
const updatePhotos = async (postId: number, fileList: Array<string>): Promise<void> =>{

    await deleteAllPhoto(postId);
    await createPhoto(postId, fileList);
}

export default {
    createPhoto,
    updatePhotos
}