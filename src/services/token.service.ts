import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import moment, { parseTwoDigitYear } from "moment";

import Token from "../models/token";
import env from "../config/environments";

import { ITokenAttributes, IPayload } from "../interfaces/token.interface";
import { Op } from "sequelize";
import { TYPETOKEN } from "../constants/token.constant";


import  User  from "../models/user";
import authError from "../constants/apiError/auth.constant";

/**
 * SAVE TOKEN IN DATABASE
 * @param {ITokenAttributes} token 
 * @returns {Promise<Token>} newToken
 */
const storeToken = async (token: ITokenAttributes): Promise<Token> => {

    const newToken = await Token.create({
        token: token.token,
        userId: token.userId,
        type: token.type,
        expire: token.expires.toDate(),
    });

    return newToken;
}

/**
 * SAVE TOKEN IN DATABASE
 * @param {ITokenAttributes} token 
 * @returns {Promise<Token>} newToken
 */
const generateToken = (userId: number, expire: moment.Moment, type: string): string => {


    const payload: IPayload = {
        sub: userId,
        iat: moment().unix(),
        exp: expire.unix(),
        type: type,
    };
    return jwt.sign(payload, env.TOKEN.TOKEN_SERCET);
};

const generateTokenVerifyEmail = async(userId: number) =>{

    const tokenExpire : moment.Moment = moment().add(env.TOKEN.TOKEN_EXPIRE_MINUTES, "minutes");

    const token = generateToken(userId, tokenExpire, TYPETOKEN.VERIFY_EMAIL);

    await storeToken({
            userId: userId,
            token: token,
            expires: tokenExpire,
            type: TYPETOKEN.VERIFY_EMAIL,
        });

    return token;
}

/**
 * Verify Token
 * @param {string} tokenName 
 * @param {string} type 
 * @returns {Promise<Token | null>}
 */
const verifyToken = async (tokenName: string, type = TYPETOKEN.VERIFY_EMAIL): Promise<Token | null> => {

    const payload = jwt.verify(tokenName, env.TOKEN.TOKEN_SERCET);

    const userId = payload.sub === undefined ? -1 : +payload.sub;

    if (userId === -1) return null;

    console.log(userId, tokenName, type);
    const tokenDoc = await Token.findOne({
        where: {
            [Op.and]: [
                { userId: userId },
                { token: tokenName },
                { type: type }
            ]
        }
    });

    //After verify, we need to remove it out of DB
    //Check again
    await removeToken(tokenName, type);

   
    return tokenDoc;
}

/**
 * generate token to authenticate
 * @param {User} user 
 * @returns {Project<Object>} access and fresh token
 */
const generateTokenAuth = async (user: User) =>{

    const tokenExpire = moment().add(env.TOKEN.TOKEN_EXPIRE_MINUTES, "minutes");
    const generateAccessToken = generateToken(user.id, tokenExpire, TYPETOKEN.ACCESS);

    const tokenRefreshExpire = moment().add(env.TOKEN.TOKEN_EXPIRE_DAY, 'days');
    const generateRefreshExpire = generateToken(user.id, tokenRefreshExpire, TYPETOKEN.REFRESH);

    await storeToken({
        userId: user.id,
        token: generateRefreshExpire,
        expires: tokenRefreshExpire,
        type: TYPETOKEN.REFRESH,
    });

    return { 
        access: {
            token: generateAccessToken,
            expire: tokenExpire,
        },
        refresh: {
            token: generateRefreshExpire,
            expire: tokenRefreshExpire   
        }
    }
}

const removeToken = async (token: string, type: string) =>{


    await Token.destroy( {
        where: {
        [Op.and]: {
            token: token,
            type: type,
        }
    }});
}


export default {
    storeToken,
    generateToken,
    verifyToken,
    generateTokenAuth,
    removeToken,
    generateTokenVerifyEmail,
}