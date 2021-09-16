import express from "express";

import authRouter from "../../controllers/auth.controller";

import validate from "../../middlewares/validate.middleware";

import validateAuth from "../../validations/auth.validation";

import auth from "../../middlewares/auth.middleware";

const router: express.Router = express.Router();


router.post("/signup",  validate(validateAuth.signUp), authRouter.signUp);

router.post("/signin", validate(validateAuth.signIn), authRouter.signIn);

router.post("/logout", auth(), validate(validateAuth.logout), authRouter.logout)

router.post("/verify-email", validate(validateAuth.verifyAccount), authRouter.verifyAccount);

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
 *                 token: 
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEwLCJpYXQiOjE2MzE4MDQxNzUsImV4cCI6MTYzNTQ1NDU3NSwidHlwZSI6InZlcmlmeUVtYWlsIn0.Pfzx0bEMczqxxBW58eEw6wL0POx_Ze6alDhHeD_HaOQ
 *                   
 *       "400":
 *         $ref: '#/components/responses/DuplicateUsername'
 *       "500":
 *         $ref: '#/components/responses/InternalError'
 */ 
 


/**
 * @swagger 
 * /auth/signin:
 *   post:
 *     summary: Login by username and password
 *     tags: [Auth]
 *     requestBody:
 *       require: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              required: 
 *                - username
 *                - password
 *              properties:
 *                username:
 *                  type: string 
 *                password:
 *                  type: string
 *              example:
 *                username: quachthanhhmd@gmail.com
 *                password: thanh123
 *  
 *     responses:
 *       "200":
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *                  
 */

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *             example:
 *               refreshToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWJhYzUzNDk1NGI1NDEzOTgwNmMxMTIiLCJpYXQiOjE1ODkyOTg0ODQsImV4cCI6MTU4OTMwMDI4NH0.m1U63blB0MLej_WfB7yC2FTMnCziif9X8yzwDEfJXAg
 *     responses:
 *       "200":
 *         description: Logout success
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */


/**
 * @swagger
 * /auth/verify-email:
 *   post:
 *     summary: Use token which has send through email to verify.
 *     tags: [Auth]
 *     parameters:
 *       - in: query
 *         name: token
 *         require: true
 *         sechema:
 *           type: string
 *         description: The verify email token
 * 
 *     responses:
 *       "200":
 *         description: Verify Success!
 *       "401":
 *         description: verify email failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               code: 401
 *               message: You are not authorized
 */
 

export default router;
