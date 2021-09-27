import faker from "faker";
import {sequelize} from "../../../src/config/sequelize";

import Friend from "../../../src/models/userFriends";
import User from "../../../src/models/user";

import {IFriendFullField} from "../interfaces/userFriend.interface";
import { IUserTestAllField, fakeUser } from "../interfaces/user.interface";

afterAll(async () => {
    await sequelize.close();
});

describe("UserFriend model", () => {
    describe("UserFriend validation", () => {

        let newConnection : IFriendFullField;

        beforeEach(() => {
            newConnection = {
                id: faker.datatype.number(100),
                friendId: faker.datatype.number(100),
                userId: faker.datatype.number(100),
                isFollow: false,
                status: "nothing",
            }
        });

        test("Should throw error if userId and FriendId don't exist", async() => {

            await expect(Friend.create(newConnection)).rejects.toThrow();
        });
        test("Should return a valid connection", async() => {
            
            const newUser = await User.create(fakeUser);
            
            fakeUser.id = faker.datatype.number(100);
            fakeUser.username = faker.internet.email().toLowerCase();
            const newFriend = await User.create(fakeUser);

            newConnection.userId = newUser.id;
            newConnection.friendId = newFriend.id;
            await expect(Friend.create(newConnection)).resolves.toBeDefined();
        });

        test("Should throw error if status doesn't in enum", async () => {

            newConnection.status = "InvalidStatus";
            await expect(Friend.create(newConnection)).rejects.toThrow();
        })
    })
})
