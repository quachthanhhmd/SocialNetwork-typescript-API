import express from "express";
import userRouter from "../../controllers/user.controller";


const router: express.Router = express.Router();



router.get('/:id', userRouter.getOneUser);


export default router;


/**
 * @swagger
 * tags:
 *   name: User 
 *   description: Execute all problems about user.
 */

/**
 * @swagger 
 * /users/{id}:
 *   get:
 *     summary: Get One User by Id.
 *     tags: [User]
 *     parameters:
 *       - in: path 
 *         name: id 
 *         schema: 
 *           type: number 
 *           required: true
 *           description: all information of user. 
 *  
 */