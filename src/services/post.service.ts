import { EMOIJ } from './../constants/emoji.constant';
import { IUpdateEmoij } from './../interfaces/emoij.interface';
import { IPagination, IPaginationResult, ISearchPagination } from './../interfaces/pagination.interface';
import db from "../models/index";
import Post from "../models/userPosts";

import userService from "../services/user.service";
import photoService from "../services/photo.service";
import emoijService from "../services/emoij.service";

import UserError from "../constants/apiError/user.contant";
import AuthError from "../constants/apiError/auth.constant";

import { ICreatePost, IUpdatePost } from "../interfaces/post.interface";
import { Op } from 'sequelize';
import userProfileService from './userProfile.service';
import Users from '../models/user';


/**
 * Create post
 * @param {number} userId 
 * @param {ICreatePost} contentPost 
 * @return {Promise<void>}
 */
const createPost = async (userId: number, contentPost: ICreatePost): Promise<Post> => {

    const user = await userService.findUserById(userId);

    if (!user) throw UserError.UserNotFound;

    const newPost = await Post.create({

        userId: userId,
        isHidden: contentPost.isHidden,
        content: contentPost.content,

    })

    if (!newPost)
        throw UserError.ServerError;

    if (!contentPost.file) {
        return newPost;
    }
    const newPhotos = await photoService.createPhoto(newPost.id, contentPost.file);
    return Object.assign(newPost, newPhotos);
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
        }],
        nest: true,
        raw: false,
    })
}

/**
 * Count all post in DB by query
 * @param {ISearchPagination} query 
 * @returns  {Promise<IPaginationResult>}
 */
const countAllPostByQuery = async (query: ISearchPagination): Promise<IPaginationResult> => {

    const queryString: string = query.search ? `%${query.search}%` : "%%";
    const totalRecord = await db.UserPost.count({
        where: {
            content: {
                [Op.like]: queryString,
            },
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
    });

    return {
        totalRecord,
        totalPage: Math.ceil(totalRecord / query.limit),
        limit: query.limit,
        page: query.page,
    }
}

/**
 *  find list post
 * @param query 
 * @returns 
 */
const findPostList = async (query: ISearchPagination) => {



    const queryString: string = query.search ? `%${query.search}%` : "%%";
    const userPostList =  await db.UserPost.findAll({
        where: {
            content: {
                [Op.like]: queryString,
            },
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
        nest: true,
        raw: false,
        order: [['createdAt', 'ASC']],
        limit: query.limit,
        offset: query.limit * (query.page - 1),
    })
    const pagingResult = await countAllPostByQuery(query);

    return Object.assign({result: userPostList}, pagingResult);
}

/**
 * Update post 
 * @param {number} postId 
 * @param {IUpdatePost} updateBody 
 * @return {Promise<void>}
 */
const updatePost = async (postId: number, updateBody: IUpdatePost): Promise<void> => {

    const post = await Post.findOne({
        where: {
            id: postId,
        }
    })

    if (!post) throw AuthError.NotFound;

    if (updateBody.file) {
        await photoService.updatePhotos(postId, updateBody.file);

        delete updateBody.file;
    }

    //Add isChange == true
    Object.assign(updateBody, { isChange: true });

    await Post.update(
        updateBody,
        {
            where: {
                id: postId,
            }
        }
    )

}


/**
 * Check wonder if post belongs to user or not
 * @param {number} userId 
 * @param {number} postId 
 * @returns {Promise<Boolean>}
 */
const checkOwnPost = async (userId: number, postId: number): Promise<Boolean> => {


    const post = await findPostById(postId);


    return (!post) ? false : (post.userId === userId) ? true : false;
}


const ChangeStateEmoij = async (userId: number, postId: number, bodyUpdate: IUpdateEmoij) => {

    const post = await findPostById(postId);

    if (!post) throw AuthError.NotFound;


    const checkStateUpdate = await emoijService.updateEmoij(userId, postId, bodyUpdate);

    // 1 if emoij, -1 if unemoij
    // if click into emoij 2 times, emoij will be delete, contrary, change emoij state
    const state: number = checkStateUpdate ? 1 : -1;

    //update post state
    await Post.update(
        { totalEmoji: post.totalEmoji + state },
        {
            where: {
                userId: userId,
            }
        }
    );


}

interface IViewUserPost {
    postId: number,
    userList: Array<Users> | null,
}

//get user who emoij the post
const getUserEmoijList = async (postId: number) => {


    const post = await findPostById(postId);

    if (!post) throw AuthError.NotFound;

    const userEmoijList = await userService.findEmoijUserList(postId);

    const emoijPostList: IViewUserPost = {
        postId: post.id,
        userList: userEmoijList
    }

    return emoijPostList;
}

/**
 * Get users commeting on the post
 * @param {number} postId 
 * @param {IPagination} paging 
 * @returns 
 */
const getCommentUserList = async (postId: number, paging: IPagination) => {

    const post = await findPostById(postId);

    if (!post) throw AuthError.NotFound;

    const userCommentList = await userService.findCommentUserList(postId, paging);


    return Object.assign({postId}, userCommentList);
}

export default {
    createPost,
    findPostById,
    findPostList,
    updatePost,
    checkOwnPost,
    ChangeStateEmoij,
    getUserEmoijList,
    getCommentUserList
}