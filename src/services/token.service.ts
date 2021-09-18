import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import moment, { parseTwoDigitYear } from "moment";

import Token from "../models/token";
import env from "../config/environments";

import { ITokenAttributes, IPayload } from "../interfaces/token.interface";
import { Op } from "sequelize";
import { TYPETOKEN } from "../constants/token.constant";


import tokenError from "../constants/apiError/token.constant";
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


/**
 * Generate token to verify email or forgot password
 * @param {numbser} userId 
 * @returns {Promise<string>} token after generating
 */
const generateTokenVerify = async(userId: number, type: string): Promise<string> =>{

    //before generateToken we need to remove token has been send before
    
    await removeTokenByUserId(userId, type);

    const tokenExpire : moment.Moment = moment().add(env.TOKEN.TOKEN_EXPIRE_MINUTES, "minutes");

    const token = generateToken(userId, tokenExpire, type);

    await storeToken({
            userId: userId,
            token: token,
            expires: tokenExpire,
            type: type,
        });

    return token;
}

/**
 * Verify Token
 * @param {string} tokenName 
 * @param {string} type 
 * @returns {Promise<Token | null>}
 */
const verifyToken = async (tokenName: string, type : string): Promise<Token> => {


    const payload = jwt.verify(tokenName, env.TOKEN.TOKEN_SERCET);


    const userId = payload.sub === undefined ? -1 : +payload.sub;

    if (userId === -1)  throw authError.UnAuthenticated;


    const tokenDoc = await Token.findOne({
        where: {
            [Op.and]: [
                { userId: userId },
                { token: tokenName },
                { type: type }
            ]
        }
    });

    if (!tokenDoc)
        throw tokenError.TokenNotFound;

    //After verify, we need to remove it out of DB
    //Check again
    await removeToken(tokenName, type);

   
    return tokenDoc;
}

/**
 * generate token to authenticate
 * @param {User} user 
 * @returns {<Promise<Object>} access and fresh token
 */
const generateTokenAuth = async (userId: number) =>{

    const tokenExpire = moment().add(env.TOKEN.TOKEN_EXPIRE_MINUTES, "minutes");
    const generateAccessToken = generateToken(userId, tokenExpire, TYPETOKEN.ACCESS);

    const tokenRefreshExpire = moment().add(env.TOKEN.TOKEN_EXPIRE_DAY, 'days');
    const generateRefreshExpire = generateToken(userId, tokenRefreshExpire, TYPETOKEN.REFRESH);



    await storeToken({
        userId: userId,
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
/**
 * REMOVE TOKEN BY TOKEN AND TYPE
 * @param {string} token 
 * @param {string} type
 * @return {Promise<void>} 
 */
const removeToken = async (token: string, type: string) : Promise<void> =>{


    await Token.destroy( {
        where: {
        [Op.and]: {
            token: token,
            type: type,
        }
    }});
}

/**
 * Remove token by User Id and type
 * @param {number} userId 
 * @param {string} type 
 * @return {Promise<void>}
 */
const removeTokenByUserId = async (userId: number, type: string)  :Promise<void> =>{

    await Token.destroy({ 
        where: {
            [Op.and]: {
                userId: userId,
                type: type,
            }
        }
    })
}


export default {
    storeToken,
    generateToken,
    verifyToken,
    generateTokenAuth,
    removeToken,
    generateTokenVerify,
    removeTokenByUserId
}