import express from "express";
import backgroundRoutes from "../../controllers/background.controller";

import auth from "../../middlewares/auth.middleware";
import validate from "../../middlewares/validate.middleware";
import backgroundValidation from "../../validations/background.validation";

const router: express.Router = express.Router();


router.post("/", auth(), validate(backgroundValidation.createBackground), backgroundRoutes.createBackground);


router 
    .patch("/:backgroundId", auth(), validate(backgroundValidation.updateBackground), backgroundRoutes.updateBackground)
    .delete("/:backgroundId", auth(), validate(backgroundValidation.deleteBackground), backgroundRoutes.deleteBackground)
export default router;


/**
 * @swagger
 * tags: 
 *   name: Background
 *   description: Background of user
 */


/**
 * @swagger
 * /background:
 *   post:
 *     summary: Create background of user
 *     description: Cretae background of user  
 *     tags: [Background]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       require: true   
 *       content:
 *         application/json: 
 *           schema:
 *             type: object 
 *             properties:
 *               name:   
 *                 type: string
 *                 required: true
 *                 example: University of Sciences
 *               status:
 *                 type: string
 *                 required: true
 *                 enum: [current, past] 
 *                 example: current
 *               link:
 *                 type: string
 *                 example: https://hcmus.edu.vn
 *               type:  
 *                 type: string
 *                 enum: [college, highschool, work]
 *                 example: college
 *               description:
 *                 type: string
 *                 example: I'm a student
 *     responses:
 *       "201":
 *          description: Create Sucess
 *          content:
 *            application/json: 
 *              schema:
 *                $ref: '#/components/schemas/Background'
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
 * /background/{backgroundId}:
 *   patch:
 *     summary: Create background of user
 *     description: Cretae background of user  
 *     tags: [Background]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path 
 *         name: backgroundId 
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
 *               name:   
 *                 type: string
 *                 required: true
 *                 example: University of Sciences
 *               status:
 *                 type: string
 *                 required: true
 *                 enum: [current, past] 
 *                 example: current
 *               link:
 *                 type: string
 *                 example: https://hcmus.edu.vn
 *               type:  
 *                 type: string
 *                 enum: [college, highschool, work]
 *                 example: college
 *               description:
 *                 type: string
 *     responses:
 *       "200":
 *          description: Update Sucess
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *       "500":
 *         $ref: '#/components/responses/InternalError' 
 * 
 *   delete:
 *     summary: Create background of user
 *     description: Cretae background of user  
 *     tags: [Background]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path 
 *         name: backgroundId 
 *         schema:
 *           type: number 
 *           required: true
 *     responses:
 *       "200":
 *          description: delete Sucess
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *       "500":
 *         $ref: '#/components/responses/InternalError'      
 */