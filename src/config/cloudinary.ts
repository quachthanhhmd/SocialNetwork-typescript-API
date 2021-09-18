import env from "./environments";
import cloudinary from "cloudinary"

const cloud = cloudinary.v2;

cloud.config({
    CLOUDINARY_URL: env.CLOUDINARY_URL
});

const uploadSingleImageProfile = (file: string, folder: string) => {
    return new Promise((resolve) => {
        cloud.uploader
            .upload(file, {
                folder: folder,
            })
            .then((result) => {
                if (result) {
                    resolve({
                        url: result.secure_url,
                        id: result.public_id,
                    })
                }
            })
    })
}


const destroySingle = (id: string) => {
    return new Promise((resolve) => {
        cloud.uploader.destroy(id, (error, result) => {
            resolve(result);
        });
    });
};


export default {
    destroySingle,
    uploadSingleImageProfile
}