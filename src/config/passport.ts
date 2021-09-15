import passportJwt from "passport-jwt";

import env from "./environments";
import { TYPETOKEN} from "../constants/token.constant";

import userService from "../services/user.service";


const JwtOptions = {
    secretOrKey: env.TOKEN.TOKEN_SERCET,
    jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
};

console.log(JwtOptions.jwtFromRequest.toString());

const verifyToken = async(payload: any, done: passportJwt.VerifiedCallback) =>{

    try {
        if (payload.type !== TYPETOKEN.ACCESS){
            throw new Error("Token is not valid!");
        }
  
        const user = await userService.getInfoOfUser(payload.sub);
        
        if (!user) return done(null, false);


        return done(null, user);
    }catch(error){
        done(error, false);
    }   
}

const jwtStrategy: passportJwt.Strategy = new passportJwt.Strategy(JwtOptions, verifyToken);


export default jwtStrategy;

