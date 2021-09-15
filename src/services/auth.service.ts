import userService from "./user.service";
import tokenService from "./token.service";
//import authError from "../constants/apiError/auth.constant";
import userError from "../constants/apiError/user.contant";

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


export default {
    loginWithUsernameAndPassword
}