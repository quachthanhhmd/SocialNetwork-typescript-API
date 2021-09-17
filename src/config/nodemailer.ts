import httpStatus from "http-status";
import ApiError from "../utils/ApiError";

import nodemailer from "nodemailer";

import env from "./environments";

import TypeEmail from "../constants/mail.constant";
import { Request } from "express";
import authError from "../constants/apiError/auth.constant";


const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: env.EMAIL.HOST,
    secure: false,
    auth: {
        user: env.EMAIL.USERNAME,
        pass: env.EMAIL.PASSWORD,
    }
});


const sendMail = async(to: string, subject: string, text: string) =>{
    const content = {
        from: env.EMAIL.USERNAME,
        to: to,
        subject: subject,
        text: text,
    }

    await transporter.sendMail(content);
}

const sendMailVerify = async (req: Request, userEmail: string, token: string): Promise<void> => {

    const urlVerify = `${req.protocol}://${req.get('host')}/verify-account?token=${token}`;

    console.log(urlVerify);


    const text = `Dear ${userEmail}, \nTo verify account ${userEmail}, please click on the link: ${urlVerify}\nIf you did not create an account, then ignore this email.`
    
    await sendMail(userEmail, "Verify Account", text);

}

/**
 * Send token to email to execute forgot password
 * @param {Request}req 
 * @param userEmail 
 * @param token 
 */
const sendMailForgotPassword = async (req: Request, userEmail: string, token: string): Promise<void> => {

    const urlVerify = `${req.protocol}://${req.get('host')}/reset-password?token=${token}`;

    console.log(urlVerify);


    const text = `Dear ${userEmail}, \nTo reset your password, click on this link, please click on the link: ${urlVerify}\nIf you did not request any password resets, then ignore this email.`
    await sendMail(userEmail, "Reset Password", text);
}

export default {
    sendMailVerify,
    sendMailForgotPassword
}