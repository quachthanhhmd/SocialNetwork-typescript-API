import jest from "jest";
import faker from "faker";

import User from "../../../src/models/user";

import { IUserTestAllField } from "../interfaces/user.interface";

// jest.mock('sequelize', () => {
//     const mSequelize = {
//       authenticate: jest.fn(),
//       define: jest.fn(),
//     };
//     const actualSequelize = jest.requireActual('sequelize');
//     return { Sequelize: jest.fn(() => mSequelize), DataTypes: actualSequelize.DataTypes };
//   });

describe("User Model", () => {

    describe("User validation", () => {

        let newUser: IUserTestAllField;
        beforeEach(() => {
            newUser = {
                id: faker.datatype.number(),
                username: faker.internet.email().toLowerCase(),
                password: "Thanh1234",
                isVerified: true,
            }
        });

        test("Should correctly valid a user", async () => {
            await expect(new User(newUser).validate()).resolves.toBeDefined();
        });

        test("Should thrrow a error if username is not a email format.", async () => {
            newUser.username = "InvalidEmail";
            await expect(new User(newUser).validate()).rejects.toThrow();
        });
    })
})

