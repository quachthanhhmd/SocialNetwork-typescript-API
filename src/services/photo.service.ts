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

export default {
    createPhoto,
}