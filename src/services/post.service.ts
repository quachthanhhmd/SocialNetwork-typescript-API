import db from "../models/index";
import Post from "../models/userPosts";
import userService from "../services/user.service";
import photoService from "../services/photo.service";

import UserError from "../constants/apiError/user.contant";

import { ICreatePost } from "../interfaces/post.interface";

const createPost = async (userId: number, contentPost: ICreatePost): Promise<void> => {

    const user = await userService.findUserById(userId);

    if (!user) throw UserError.UserNotFound;

    const newPost = await Post.create({

        userId: userId,
        content: contentPost.content,

    })
    
    if (!newPost)   
        throw UserError.ServerError;

    if (contentPost.file){
        await photoService.createPhoto(newPost.id, contentPost.file);
    }

}



export default {
    createPost,
}