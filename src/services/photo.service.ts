import Photo from "../models/photos";



const createPhoto = async (postId: number, fileList: Array<string>) => {

    if (fileList.length === 0)
        return;

    fileList.forEach( async (file : string) => {

        await Photo.create({ 
            postId: postId,
            imageLink: file,
        }) 
    });

 

}

export default {
    createPhoto,
}