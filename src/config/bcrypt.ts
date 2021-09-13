import bcrypt from "bcrypt";

const saltRounds = 10;

type initPasswordHash = (password: string) => string;
type comparePasswordHash = (passwordDB: string, passwordInput: string) => Boolean;

/**
 * 
 * @param password 
 * @returns {<Promise>String}
 */
export const initPasswordHash = (password: string) => {
    const salt = bcrypt.genSaltSync(saltRounds);

    return bcrypt.hashSync(password, salt);
};

/**
 * 
 * @param passwordDB 
 * @param passwordInput 
 * @returns {<Promise>Boolean}
 */
export const comparePasswordHash = (passwordDB: string, passwordInput: string) => {

    return bcrypt.compareSync(passwordInput, passwordDB);
}

