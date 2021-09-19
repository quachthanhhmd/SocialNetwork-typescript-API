import express from "express";

import messageRouter from "../../controllers/message.controller";
import auth from "../../middlewares/auth.middleware";


const router: express.Router = express.Router();


router.post("/create-mesage/:targetId", auth(), messageRouter.createMessage);


export default router;


/**
 * @swagger
 * tags:
 *   name: Message
 *   description: Send message to other user
 */


/**
 * @swagger
 * /message/create-mesage/{targetId}:
 *   post:
 *     description: user send message for another user. We store it in DB. IMPORTANT, besure to store image, video and file at FE and send link for us. We aren't reponsible for this problem.
 *     tags: [Message]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path 
 *         name: targetId 
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
 *               link:  
 *                 type: string
 *               type:
 *                 type: string 
 *                 enum: [file, text, video, image]
 *             example:
 *               content: Hello, my name is Thanh  
 *               type: text
 *     responses:
 *       "201":
 *         description: NO CONTENT
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *      
 */
