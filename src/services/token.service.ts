import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import moment, { parseTwoDigitYear } from "moment";


import Token from "../models/token";
import env from "../config/environments";
import { ITokenAttributes, IPayload } from "../interfaces/token.interface";
import { Op } from "sequelize";
import { TYPETOKEN } from "../constants/token.constant";

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
const generateToken = (token: ITokenAttributes): string => {

    const payload: IPayload = {
        sub: token.userId,
        iat: moment().unix(),
        exp: token.expires.unix(),
        type: token.type,
    };
    return jwt.sign(payload, env.TOKEN_SERCET);
};


const verifyToken = async (tokenName: string, type = TYPETOKEN.VERIFY_EMAIL): Promise<Token | null> => {

    const payload = jwt.verify(tokenName, env.TOKEN_SERCET);

    const userId = payload.sub === undefined ? -1 : +payload.sub;

    if (userId === -1) return null;

    const tokenDoc = await Token.findOne({
        where: {
            [Op.and]: [
                { userId: userId },
                { token: tokenName },
                { type: type }
            ]
        }
    });
    console.log(tokenDoc);

    return tokenDoc;
}

export default {
    storeToken,
    generateToken,
    verifyToken,
}