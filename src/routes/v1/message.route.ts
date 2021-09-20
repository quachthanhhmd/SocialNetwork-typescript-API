import express from "express";

import messageRouter from "../../controllers/message.controller";
import auth from "../../middlewares/auth.middleware";

import validate from "../../middlewares/validate.middleware";
import messageValidation from "../../validations/message.validation";

const router: express.Router = express.Router();


router
    .post("/:targetId", auth(), validate(messageValidation.createMessage), messageRouter.createMessage)
    .delete("/:targetId", auth(), validate(messageValidation.deleteConversation), messageRouter.deleteConversation)
    .get("/:targetId", auth(), validate(messageValidation.getListMessages), messageRouter.getListMessages);

router.delete("/:targetId/:messageId", auth(), validate(messageValidation.deleteOneMessage), messageRouter.deleteOneMessage);

export default router;


/**
 * @swagger
 * tags:
 *   name: Message
 *   description: Send message to other user
 */


/**
 * @swagger
 * /message/{targetId}:
 *   get:
 *     description: get list message sort by create time
 *     tags: [Message]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: targetId
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
 *       - in: query
 *         name: search 
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         $ref: '#/components/schemas/Messages'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
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
 *   delete:
 *     description: User can delete the conversation. If one of them delete the conversation, all message of them will be removed
 *     tags: [Message]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: targetId
 *         schema:
 *           type: number
 *           required: true
 *     responses:
 *       "201":
 *         description: NO CONTENT
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */


/**
 * @swagger
 * /message/{targetId}/{messageId}:
 *   delete:
 *     decription: Delete message for my own user - it means that a parner friend still watch it.
 *     tags: [Message]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: targetId
 *         schema:
 *           type: number
 *           required: true
 *       - in: path
 *         name: messageId
 *         schema:
 *           type: number
 *           required: true
 *     responses:
 *       "200":
 *         description: OK
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */