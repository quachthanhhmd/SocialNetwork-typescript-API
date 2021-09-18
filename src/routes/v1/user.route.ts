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
 *                       type: date
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
 *                   birthDay: 11/06/2000 
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
 *                 type: date
 *               gender: 
 *                 type: string 
 *                 enum: [male, female, other]
 *               avtImage: 
 *                 type: string
 *               backgroundImage: 
 *                 type: string
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
 *       "500"
 *         $ref: '#/components/responses/InternalError'
 *            
 */

