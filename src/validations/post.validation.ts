import Joi from "joi";

const createPost = {
    body: Joi.object().keys({
        content: Joi.string().required().max(1000),
        imageLink: Joi.array().items(Joi.string()),
    })
}


const getPost = {
    params: Joi.object().keys({
        id: Joi.number().required()
    })
}

const getPostList = {

    params: Joi.object().keys({
        limit: Joi.number().min(0).default(8),
        page: Joi.number().min(0).default(1),
        query: Joi.string(),
    })
}

export default {
    getPostList,
    getPost,
    createPost,
}