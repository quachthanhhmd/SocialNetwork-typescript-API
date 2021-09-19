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

router.post("/send-again-verify-email", auth(), authRouter.sendEmailVerifyAgain);

router.post("/refresh-token", validate(validateAuth.refreshToken), authRouter.refreshToken);

router.post("/forgot-password", validate(validateAuth.forgotPassword) ,authRouter.forgotPassword);

router.post("/reset-password", authRouter.resetPassword);

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
 *                 tokens:
 *                   $ref: '#/components/schemas/Token'
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


 /**
 * @swagger
 * /auth/send-again-verify-email:
 *   post:
 *     summary: Send verification email again
 *     description: Email will be send again when user didn't receive email before.
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: return when sending email verify success
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Send email verify success
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * /auth/refresh-token:
 *   post:
 *     summary: Refresh Token 
 *     tags: [Auth]
 *     requestBody:
 *       require: true
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
 *               refreshToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 *     responses:
 *       "200":
 *         description: Refresh token success
 *         $ref: '#/components/Token'
 *       "401":
 *          $ref: '#/components/responses/Unauthorized'
 *                
 */

/**
 * @swagger
 * /auth/forgot-password: 
 *   post:
 *     summary: forgot password
 *     description: post token to reset password through email.
 *     tags: [Auth]
 *     requestBody:
 *       require: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: 
 *               - username 
 *             properties:
 *               username: 
 *                 type: string 
 *                 format: email
 *             example: 
 *               username: quachthanhhmd@gmail.com
 * 
 *     responses:
 *       "200":
 *         description: generate token sucess
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code: 
 *                   type: string
 *                 message:
 *                   type: string
 *               example:
 *                 code: 200
 *                 message: generate token sucess
 *       "404":
 *          $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: reset password by token
 *     description: using token has been send through email and password inputed by user to reset password
 *     tags: [Auth]
 *     requestBody:
 *       require: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:        
 *               - resetToken
 *               - password
 *             properties:
 *               resetToken: 
 *                 type: string
 *               password: 
 *                 type: string 
 *             example:
 *               resetToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEyLCJpYXQiOjE2MzE4NzE4MDQsImV4cCI6MTYzMTg3NTQwNCwidHlwZSI6InJlc2V0UGFzc3dvcmQifQ.ivzk8PNK78W658u9S7_ZkcCaWmwerDOyoJ45qGvznGU
 *               password: thanhdeptrai123
 * 
 *     responses:
 *       "200":
 *         description: return when reset pasword success and pasword will be saved in DB
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Reset password success
 * 
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 * 
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

export default router;
