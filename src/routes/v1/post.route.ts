import express from "express";
import postRoutes from "../../controllers/post.controller";

import auth from "../../middlewares/auth.middleware";
import validate from "../../middlewares/validate.middleware";
import postValidation from "../../validations/post.validation";

const router: express.Router = express.Router();

router
    .post("/", auth(), validate(postValidation.createPost), postRoutes.createPost)
    .get("/", auth(), validate(postValidation.getPostList), postRoutes.getPostList);


router.get("/:postId", validate(postValidation.getPost), postRoutes.getOnePost);


/**
 * @swagger
 * tags: 
 *   name: Post
 *   description: user post our post
 */


/**
 * @swagger
 * /post:
 *   post:
 *     summary: Post our post to internet. Be sure to upload file in FE and send linke for BE as a json.
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       require: true
 *       content:
 *         application/json: 
 *           schema:
 *             type: object 
 *             properties: 
 *               content:
 *                 type: string
 *                 required: true
 *               imageLink:
 *                 type: array
 *                 items:
 *                   type: string 
 *             example: 
 *               id: 1
 *               content: Hello, my name is thanh
 *               isHidden: false
 *               isChange: false
 *               userId: 1 
 *               createdAt: 2021-09-15T08:11:22.838Z
 *               updateAt: 2021-09-15T08:11:22.838Z
 *               imageLink: ["https://i.stack.imgur.com/HdeKH.jpg", https://i.stack.imgur.com/HdeKH.jpg" ]  
 *   
 *     responses:
 *       "201": 
 *         $ref: '#/components/schemas/Post'
 *       "401": 
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *       "500":
 *         $ref: '#/components/responses/InternalError'
 * 
 *   get:
 *     summary: Get list Post pagination
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *           required: true
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *           required: true
 *       - in: query
 *         name: search 
 *         schema:
 *           type: string
 *      
 *         
 *     responses:
 *       "201": 
 *         content: 
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *             example:
 *               - id: 1
 *                 content: Hello, my name is thanh
 *                 isHidden: false
 *                 isChange: false
 *                 userId: 1 
 *                 createdAt: 2021-09-15T08:11:22.838Z
 *                 updateAt: 2021-09-15T08:11:22.838Z
 *                 imageLink: ["https://i.stack.imgur.com/HdeKH.jpg", https://i.stack.imgur.com/HdeKH.jpg"]      
 *               - id: 2
 *                 content: Hello, my name is thanh
 *                 isHidden: false
 *                 isChange: false
 *                 userId: 1 
 *                 createdAt: 2021-09-15T08:11:22.838Z
 *                 updateAt: 2021-09-15T08:11:22.838Z
 *                 imageLink: ["https://i.stack.imgur.com/HdeKH.jpg", https://i.stack.imgur.com/HdeKH.jpg"] 
 *               
 *       "401": 
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *       "500":
 *         $ref: '#/components/responses/InternalError'
 */


/**
 * @swagger
 * /post/{postId}:
 *   get:
 *     summary: Get one post
 *     tags: [Post]
 *     parameters:
 *       - in: path 
 *         name: postId 
 *         schema: 
 *           type: number
 *           required: true
 *     responses:
 *       "201": 
 *         $ref: '#/components/schemas/Post'
 *       "500":
 *         $ref: '#/components/responses/InternalError'
 *  
 */

