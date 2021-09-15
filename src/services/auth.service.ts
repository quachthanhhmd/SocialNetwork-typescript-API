import userService from "./user.service";
import tokenService from "./token.service";
import userError from "../constants/apiError/user.contant";
import { TYPETOKEN } from "../constants/token.constant";

/**
 * Use to login with user name and password
 * @param {string} username 
 * @param {string} password 
 * @returns {Promise<User>} user
 */
const loginWithUsernameAndPassword =  async (username : string, password: string) => {


    const user = await userService.findUserbyUsername(username);


    if (!user || !userService.isPasswordMatch(user, password))
        throw userError.LoginFailed;

 
    return user;
}

/**
 * Logout for user 
 * @param refreshToken 
 */
const logoutAuth = async (refreshToken: string) => {

    await tokenService.removeToken(refreshToken, TYPETOKEN.REFRESH);
}


export default {
    loginWithUsernameAndPassword,
    logoutAuth,
}