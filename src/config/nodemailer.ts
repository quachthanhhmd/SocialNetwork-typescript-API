import nodemailer from "nodemailer";

import env from "./environments";

import TypeEmail from "../constants/mail.constant";
import { Request } from "express";
import authError from "../constants/apiError/auth.constant";


const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    secure: false,
    auth: {
        user: env.EMAIL.USERNAME,
        pass: env.EMAIL.PASSWORD,
    }
});




const sendMailVerify =  async (req : Request, userEmail : string, token: string): Promise<void> =>{

    try { 

        const urlVerify = `${req.protocol}://${req.get('host')}/verify-account?token=${token}`;
        
        console.log(urlVerify);


        const text = `Dear ${userEmail}, \nTo verify account ${userEmail}, please click on the link: ${urlVerify}\nIf you did not create an account, then ignore this email.`
        const content = {
            from: env.EMAIL.USERNAME,
            to: userEmail,
            subject: "Verify Account",
            text: text,
        }

        await transporter.sendMail( content);

    }catch(error) {
        console.log(error);
    }
}


export default {
    sendMailVerify,
}