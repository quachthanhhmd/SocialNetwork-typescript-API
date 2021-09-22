import Joi from "joi";

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

export default {
    getPostList,
    getPost,
    createPost,
}