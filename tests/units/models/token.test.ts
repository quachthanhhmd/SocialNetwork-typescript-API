import faker from "faker";
import { sequelize } from "../../../src/config/sequelize";

import Token from "../../../src/models/token";
import User from "../../../src/models/user";

import { ITokenFullField } from "../interfaces/token.interface";
import { fakeUser } from "../interfaces/user.interface";


afterAll(async () => {
    await sequelize.close();
})

describe("Token model", () => {
    describe("Token validation", () => {

        let newToken: ITokenFullField;
        beforeAll(() => {
            newToken = {
                id: faker.datatype.number(100),
                token: "x".repeat(50),
                type: "refresh",
                expire: new Date(Date.now() + 1000),
                userId: faker.datatype.number(100),
            }
        });

        test("Should throw a error if user doesn't exist", async () => {
            await expect(Token.create(newToken)).rejects.toThrow();
        });

        test("Should return valid a token, Be sure create User before test", async () => {
            const user = await User.create(fakeUser);
            newToken.userId = user.id;

            await expect(Token.create(newToken)).resolves.toBeDefined();
        });
        test("Should throw a error if expire is less than the now date.", async() =>{
            newToken.expire = new Date(Date.now() - 100000);
            await expect(Token.create(newToken)).rejects.toThrow();
        });
        test("Should throw a error if type doesn't in [refresh, resetpassword, verifyemail]", async() => {
            newToken.type = "InvalidType";

            await expect(Token.create(newToken)).rejects.toThrow();
        })
    })
})
