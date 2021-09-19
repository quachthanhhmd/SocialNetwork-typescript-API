import express from "express";

import auth from "../../middlewares/auth.middleware";
import userRouter from "../../controllers/user.controller";
import multer from "../../config/multer";
import validate from "../../middlewares/validate.middleware";
import userValidation from "../../validations/user.validation";


const router: express.Router = express.Router();



router.get('/:id', auth(), validate(userValidation.getUser), userRouter.getOneUser);
router.patch('/:id', auth(), validate(userValidation.updateUserProfile), userRouter.updateUser);

router.put('/avatar/:id', auth(), validate(userValidation.updateAvt), multer.imageUpload.single('avtImage'), userRouter.updateAvt);
router.put('/background-image/:id', auth(), validate(userValidation.updateBackgroundImage), multer.imageUpload.single('backgroundImage'), userRouter.updateBackgroundImage);

router.post('/request-friend/:id', auth(), validate(userValidation.requestFriend), userRouter.sendRequestFriend);


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
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path 
 *         name: id 
 *         schema: 
 *           type: number 
 *           required: true
 *           description: all information of user. 
 *     
 *     responses:
 *       "200":
 *         description: get user success. 
 *         content:
 *           application/json:
 *             schema:
 *               type: object 
 *               properties:
 *                 id:
 *                   type: number
 *                 username: 
 *                   type: string
 *                 profile:
 *                   type: object 
 *                   properties:
 *                     id:
 *                       type: string
 *                     firstName:
 *                       type: string 
 *                     lastName:   
 *                       type: string
 *                     displayName:
 *                       type: string 
 *                     backgroundImage:
 *                       type: string 
 *                     avtImage:
 *                       type: string 
 *                     birthDay:
 *                       type: string
 *                       format: date
 *                     gender:
 *                       type: string 
 *                       enum: [male, female, other]
 *                     contacts:
 *                       type: object
 *                       properties:
 *                         email:
 *                           type: string
 *                         phoneNumber:
 *                           type: string 
 *                         skype: 
 *                           type: string 
 *                         github: 
 *                           type: string 
 *                         linkedin: 
 *                           type: string 
 *                 posts:
 *                   type: array
 *                   items:
 *                     type: object 
 *                     properties:
 *                       id: 
 *                         type: string 
 *                       content:
 *                         type: string
 *                       isChange: 
 *                         type: boolean 
 *                       isHidden:
 *                         type: boolean
 *                 backgrounds:
 *                   type: array 
 *                   items:
 *                     type: object 
 *                     properties:
 *                       id:
 *                         type: string 
 *                       status: 
 *                         type: string
 *                         enum: [current, past]
 *                       name:
 *                         type: string 
 *                       type:
 *                         type: string 
 *                         enum: [highschool, work, college]
 *                 friends:
 *                   type: array
 *                   items: 
 *                     type: object 
 *                     properties: 
 *                       id: 
 *                         type: string 
 *                       avtImage:
 *                         type: string 
 *                       displayName:
 *                         type: string     
 *                    
 *               example:
 *                 id: 1 
 *                 username: quachthanhhmd@gmail.com 
 *                 profile: 
 *                   id: 1
 *                   firstName: Thanh
 *                   lastName: Quach 
 *                   displayName: Thanh Quach
 *                   backgroundImage: https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCVbARnH-7g5hQ1HKBH3roPQE4WekAJYjqsg&usqp=CAU
 *                   avtImage: https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCVbARnH-7g5hQ1HKBH3roPQE4WekAJYjqsg&usqp=CAU
 *                   birthDay: 2000-06-11
 *                   gender: male 
 *                   contacts:
 *                     email: quachthanhhmd@gmail.com   
 *                     phoneNumber: "0846088201"
 *                     github: https://github.com/quachthanhhmd
 *                     linkedin: https://www.linkedin.com/in/thanh-quach-hai-1a4959190/
 *                     skype: https://www.linkedin.com/in/thanh-quach-hai-1a4959190/
 *                 posts: 
 *                   - id: 1        
 *                     content: ao ma canada maylasia huba chacha
 *                     isChange: false
 *                     isHidden: false
 *                 background: 
 *                   - id: 1 
 *                     status: past
 *                     name: University of life 
 *                     type: college
 *                 friends:
 *                   - id: 1 
 *                     displayName: Van Anh
 *                     avtImage: https://i.ytimg.com/vi/XHEqQoOqyVY/hqdefault.jpg
 *            
 *       "404":
 *          desciption: user not found
 *          $ref: '#/components/responses/NotFound'           
 *     
 *   patch: 
 *     summary: Update user information
 *     desciption: update user information
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path 
 *         name: id 
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
 *               firstName:    
 *                 type: string 
 *               lastName:
 *                 type: string 
 *               birthDay:  
 *                 type: string
 *                 format: date
 *               gender: 
 *                 type: string 
 *                 enum: [male, female, other]
 *               email: 
 *                 type: string
 *               github:
 *                 type: string 
 *               phoneNumber:
 *                 type: string 
 *               skype: 
 *                 type: string 
 *               linkedin:  
 *                 type: string 
 *             example:
 *               firstName: Hai
 *               lastName: Thanh
 *               birthDay: 06/11/2000
 *               gender: male
 *               avtImage: https://i.ytimg.com/vi/XHEqQoOqyVY/hqdefault.jpg
 *               backgroundImage: https://i.ytimg.com/vi/XHEqQoOqyVY/hqdefault.jpg
 *               email: quachthanhhmd@gmail.com 
 *               phoneNumber: "0846088201"
 *               skype: https://www.linkedin.com/in/thanh-quach-hai-1a4959190/
 *               github: https://github.com/quachthanhhmd
 *               linkedin: https://www.linkedin.com/in/thanh-quach-hai-1a4959190/
 *     
 *     responses:
 *       "200":
 *         description: Update success 
 *         content:
 *           application/json: 
 *             schema: 
 *               type: string 
 *               example: Update success
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *       "500":
 *         $ref: '#/components/responses/InternalError'
 *            
 */

/**
 * @swagger 
 * /users/avatar/{id}:
 *   put: 
 *     summary: update avatar for user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path 
 *         name: id 
 *         schema:
 *           type: number
 *           required: true 
 *     requestBody:
 *       require: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:            
 *               avtImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       "204": 
 *         description: NO CONTENT  
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *       "500":
 *         $ref: '#/components/responses/InternalError'      
 *              
 *   
 */

/**
 * @swagger 
 * /users/background-image/{id}:
 *   put: 
 *     summary: update background Image for user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path 
 *         name: id 
 *         schema:
 *           type: number
 *           required: true 
 *     requestBody:
 *       require: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:            
 *               backgroundImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       "204": 
 *         description: NO CONTENT  
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *       "500":
 *         $ref: '#/components/responses/InternalError'  
 *              
 *   
 */

/**
 * @swagger
 * /users/request-friend/{id}:
 *   post:
 *     summary: request other users to become a friend
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path 
 *         name: id 
 *         schema: 
 *           type: number 
 *           required: true
 *     responses:
 *       "200": 
 *          description: NO CONTENT 
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *          $ref: '#/components/responses/NotFound'
 *          
 */