import Joi from "joi";
import { EMOIJ } from "../constants/emoji.constant";

const createPost = {
    body: Joi.object().keys({
        content: Joi.string().required().max(1000),
        isHidden: Joi.boolean().default(false),
        file: Joi.array().items(Joi.string()),
    })
}


const getPost = {
    params: Joi.object().keys({
        postId: Joi.number().required()
    })
}

const getPostList = {

    query: Joi.object().keys({
        limit: Joi.number().min(0),
        page: Joi.number().min(0),
        search: Joi.string(),
    })
}

const updatePost = {

    params: Joi.object().keys({
        postId: Joi.number().required(),
    }),
    body: Joi.object().keys({
        content: Joi.string().max(1000),
        isHidden: Joi.boolean(),
        file: Joi.array().items(Joi.string()),
    })
}

const updateEmoij = {
    params: Joi.object().keys({
        postId: Joi.number().required()
    }),
    body: Joi.object().keys({
        type: Joi.string().valid(EMOIJ.ANGRY, EMOIJ.CARE, EMOIJ.HAHA, EMOIJ.LIKE, EMOIJ.LOVE, EMOIJ.NONE, EMOIJ.SAD, EMOIJ.WOW),
    })
}

const getUserEmoijList = {
    params: Joi.object().keys({
        postId: Joi.number().required()
    }),
}


const createComment = {
    params: Joi.object().keys({
        postId: Joi.number().required()
    }),
    body: Joi.object().keys({
        content: Joi.string().required(),
    })
}

const getPagingUserComment  = {
    params: Joi.object().keys({
        postId: Joi.number().required()
    }),
    query: Joi.object().keys({
        limit: Joi.number().min(0).default(8),
        page: Joi.number().min(0).default(1),
    })
}

const updateComment = {
    params: Joi.object().keys({
        commentId: Joi.number().required()
    }),
    body: Joi.object().keys({
        content: Joi.string().required(),
    })
}


export default {
    getPostList,
    getPost,
    createPost,
    updatePost,
    updateEmoij,
    getUserEmoijList,
    createComment,
    getPagingUserComment,
    updateComment,
}