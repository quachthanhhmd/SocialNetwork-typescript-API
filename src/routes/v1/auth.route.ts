import express from "express";

import authRouter from "../../controllers/auth.controller";

import validate from "../../middlewares/validate.middleware";

import validateAuth from "../../validations/auth.validation";

const router: express.Router = express.Router();


router.post("/signup",  validate(validateAuth.signUp), authRouter.signUp);



/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authetication user.
 */

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: user register their account.
 *     tags: [Auth]
 *     requestBody:
 *       require: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - username
 *               - password
 *               - password2
 *               - birthDay
 *               - gender
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               password2:
 *                 type: string
 *               birthDay:
 *                 type: Date
 *               gender:
 *                 type: string
 *             example:
 *               firstName: Thanh
 *               lastName: Hai
 *               username: quachthanhhmd@gmail.com
 *               password: thanh123
 *               password2: thanh123
 *               birthDay: 11/06/2000
 *               gender: male
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       "400":
 *         $ref: '#/components/responses/DuplicateUsername'
 *       "500":
 *         $ref: '#/components/responses/InternalError'
 */


export default router;
