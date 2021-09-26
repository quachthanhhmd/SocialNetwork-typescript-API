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
            const cloneUser: IUserTestAllField = { ...newUser };
            cloneUser.username = "InvalidEmail";

            await expect(new User(cloneUser).validate()).rejects.toThrow();
        });

        test("Should throw a error if password doesn't have a UpperCase", async () => {
            const cloneUser: IUserTestAllField = { ...newUser };
            cloneUser.password = "thanh123456";
            console.log(cloneUser);
            await expect(User.create(cloneUser)).rejects.toEqual(expect.any(Error));
        });

        test("Should throw a error if password doesn't have a number.", async () => {
            const cloneUser: IUserTestAllField = { ...newUser };
            cloneUser.password = "ThanhHaiThanh";

            await expect(User.create(cloneUser)).rejects.toThrow("Password is not valid");
        });

        test("Should throw a error if password doesn't have a lowercase.", async () => {
            const cloneUser: IUserTestAllField = { ...newUser };
            cloneUser.password = "THANHQUACHTHANH1";

            await expect(User.create(cloneUser)).rejects.toThrow("Password is not valid");
        });

        test("Should throw a error if isVerified isn't Boolean type", async () => {
            const cloneUser: IUserTestAllField = { ...newUser };
            cloneUser.password = "Thanh1";
            await expect(User.create(cloneUser)).rejects.toThrow("Password is not valid");
        })
    })
})

