import { ISearchPagination } from './../interfaces/pagination.interface';
import db from "../models/index";
import Post from "../models/userPosts";
import userService from "../services/user.service";
import photoService from "../services/photo.service";

import UserError from "../constants/apiError/user.contant";

import { ICreatePost } from "../interfaces/post.interface";


/**
 * Create post
 * @param {number} userId 
 * @param {ICreatePost} contentPost 
 * @return {Promise<void>}
 */
const createPost = async (userId: number, contentPost: ICreatePost): Promise<void> => {

    const user = await userService.findUserById(userId);

    if (!user) throw UserError.UserNotFound;

    const newPost = await Post.create({

        userId: userId,
        content: contentPost.content,

    })

    if (!newPost)
        throw UserError.ServerError;

    if (contentPost.file) {
        await photoService.createPhoto(newPost.id, contentPost.file);
    }

}

/**
 * FInd one post
 * @param {number} postId 
 * @returns 
 */
const findPostById = async (postId: number): Promise<Post | null> => {


    return db.UserPost.findOne({
        where: {
            id: postId
        },
        include: [{
            model: db.Photo,
            as: "photos",
            attributes: ["id", "imageLink"],
        },
        {
            model: db.Comment,
            as: "commets"
        }]
    })
}

/**
 *  find list post
 * @param query 
 * @returns 
 */
const findPostList = async (query: ISearchPagination): Promise<Array<Post> | null> => {

    const queryString : string = query.search? query.search: "";
    return db.UserPost.findAll({
        where: {
            content: `%${queryString}%`,
        },
        include: [{
            model: db.Photo,
            as: "photos",
            attributes: ["id", "imageLink"],
        },
        {
            model: db.Comment,
            as: "commets"
        }],
        limit: query.limit,
        offset: query.limit* (query.page - 1),
    })
}

export default {
    createPost,
    findPostById,
    findPostList
}