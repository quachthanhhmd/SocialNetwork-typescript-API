import multer from "multer";

import { Request } from "express";

const imageStorage = multer.diskStorage({
    destination: (req: Request, file: any, cb: any) => {
        cb(null, './uploads/images');
    },
    filename: function (req: Request, file: any, cb: any) {
        
        cb(null, new Date().toISOString().split(/:/).join('-') + file.originalname);
    },
})

const imageFileFilter = (req: Request, file: any, cb: any) => {
    console.log(file.mimetype);
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Only support: jpg, jpeg, png file type!'), false);
    }
};


const imageUpload = multer({
    storage: imageStorage,
    limits: { fileSize: 1024 * 1024 * 5 }, // 5 MB for each file
    fileFilter: imageFileFilter,
});


export default {
    imageUpload
}