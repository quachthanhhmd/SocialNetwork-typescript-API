import Joi from "joi";

const passwordCheck = (value: string, helper: any) =>{

    if (value.length < 8){
        return helper.message( 'password must be at least 8 characters');
    }

    if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
        return helper.message('password must contain at least 1 letter and 1 number');
      }

   return value;   
}

export default {
    passwordCheck
}