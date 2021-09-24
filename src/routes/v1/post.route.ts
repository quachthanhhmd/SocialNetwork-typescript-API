import express from "express";
import postRoutes from "../../controllers/post.controller";

import auth from "../../middlewares/auth.middleware";
import validate from "../../middlewares/validate.middleware";
import postValidation from "../../validations/post.validation";

const router: express.Router = express.Router();

router
    .post("/", auth(), validate(postValidation.createPost), postRoutes.createPost)
    .get("/", auth(), validate(postValidation.getPostList), postRoutes.getPostList);


router
    .get("/:postId", validate(postValidation.getPost), postRoutes.getOnePost)   
    .patch("/:postId", auth(), validate(postValidation.updatePost), postRoutes.updatePost);

router
    .patch("/emoij/:postId", auth(), validate(postValidation.updateEmoij), postRoutes.updateEmoij)
    .get("/emoij/:postId",validate(postValidation.getUserEmoijList), postRoutes.getUserEmoijList)

router
    .post("/comment/:postId", auth(), validate(postValidation.createComment), postRoutes.createComment)
    .get("/comment/:postId", validate(postValidation.getPagingUserComment), postRoutes.getUserCommentList);
export default router;

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
 *               isHidden: 
 *                 type: boolean
 *               file:
 *                 type: array
 *                 items:
 *                   type: string 
 *             example: 
 *               content: Hello, my name is thanh
 *               file: [https://i.stack.imgur.com/HdeKH.jpg, https://i.stack.imgur.com/HdeKH.jpg ]  
 *   
 *     responses:
 *       "201": 
 *         description: Post new Post sucess
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
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
 *       "200": 
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: array
 *                   items:
 *                     type: object
 *                 totalRecord: 
 *                   type: number 
 *                 totalPage:
 *                   type: number
 *                 limit:
 *                   type: number
 *                 page: 
 *                   type: number 
 *             example:
 *               result:
 *                 - id: 1
 *                   content: Hello, my name is thanh
 *                   isHidden: false
 *                   isChange: false
 *                   userId: 1 
 *                   createdAt: 2021-09-15T08:11:22.838Z
 *                   updateAt: 2021-09-15T08:11:22.838Z
 *                   file: 
 *                     - id: 1 
 *                       imageLink: https://i.stack.imgur.com/HdeKH.jpg
 *                     - id: 2 
 *                       imageLink: https://i.stack.imgur.com/HdeKH.jpg      
 *                 - id: 2
 *                   content: Hello, my name is thanh
 *                   isHidden: false
 *                   isChange: false
 *                   userId: 1 
 *                   createdAt: 2021-09-15T08:11:22.838Z
 *                   updateAt: 2021-09-15T08:11:22.838Z
 *                   file: 
 *                     - id: 1 
 *                       imageLink: https://i.stack.imgur.com/HdeKH.jpg 
 *                     - id: 2 
 *                       imageLink: https://i.stack.imgur.com/HdeKH.jpg
 *               totalRecord: 2
 *               totalPage: 2
 *               limit: 2
 *               page: 1
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
 *       "200": 
 *         $ref: '#/components/schemas/Post'
 *       "500":
 *         $ref: '#/components/responses/InternalError'
 *   
 *   patch:
 *     summary: Update post by post Id
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema: 
 *           type: number
 *           required: true
 *     requestBody:
 *       require: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object 
 *             properties:
 *               content: 
 *                 type: string 
 *               isHidden: 
 *                 type: Boolean
 *               file:
 *                 type: array 
 *                 items:
 *                   imageLink: 
 *                     type: string 
 *             example:
 *               content: I'm so lazy
 *               isHidden: true
 *               file: 
 *                 - https://i.stack.imgur.com/HdeKH.jpg  
 *                 - https://i.stack.imgur.com/HdeKH.jpg  
 *                 - https://i.stack.imgur.com/HdeKH.jpg  
 *     responses:
 *       "200":
 *         description: OK
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
 * /post/emoij/{postId}:
 *   get:
 *     summary: Get a list of user who emoij for this post
 *     tags: [Post]
 *     parameters:
 *       - in: path 
 *         name: postId 
 *         schema: 
 *           type: number
 *           required: true
 *     responses:
 *       "200": 
 *         description: Create new comment success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       "500":
 *         $ref: '#/components/responses/InternalError'
 *   patch:
 *     summary: update emoij 
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path 
 *         name: postId 
 *         schema: 
 *           type: number
 *           required: true
 *     requestBody:
 *       require: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type: 
 *                 type: string 
 *                 enum: [like, haha, sad, angry, wow, none, care, love]
 *             example:
 *               type: like
 *     responses:
 *       "200": 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 postId:
 *                   type: number
 *                 userList:
 *                   type: array
 *                   items: 
 *                     type: object
 *                     properties:
 *                       id: 
 *                         type: number
 *                       profile: 
 *                         type: object 
 *                         properties:
 *                           firstName:
 *                             type: string
 *                           lastName: 
 *                             type: string
 *                           avtImage:
 *                             type: string
 *                       Emoij: 
 *                         type: object 
 *                         properties:
 *                           type:
 *                             type: string
 *               example: 
 *                 postId: 1
 *                 userList:
 *                   - id: 1 
 *                     profile: 
 *                       firstName: Thanh
 *                       lastName: Hai    
 *                       avtImage: https://i.stack.imgur.com/HdeKH.jpg
 *                     Emoij:
 *                       type: like
 *                   - id: 2
 *                     profile:     
 *                       firstName: Quach
 *                       lastName: Thanh
 *                       avtImage: https://i.stack.imgur.com/HdeKH.jpg
 *                     Emoij:
 *                       type: love            
 *                                            
 *       "500":
 *         $ref: '#/components/responses/InternalError'
 *   
 */


/**
 * @swagger
 * /post/comment/{postId}:
 *   get:
 *     summary: Get a list of user who comment for this post
 *     tags: [Post]
 *     parameters:
 *       - in: path 
 *         name: postId 
 *         schema: 
 *           type: number
 *           required: true
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
 *     responses:
 *       "200": 
 *         description: get comment sucess
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       "500":
 *         $ref: '#/components/responses/InternalError'
 *   post: 
 *     description: Create new comment
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId 
 *         schema:
 *           type: number
 *           required: true
 *     requestBody:
 *       content: 
 *         application/json:
 *           schema:
 *             type: object 
 *             properties: 
 *               content:
 *                 type: string
 *             example:
 *               content: You are very beautiful.
 *     responses:
 *       "201":
 *         description: Create new comment success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "500":
 *         $ref: '#/components/responses/InternalError'     
 */
