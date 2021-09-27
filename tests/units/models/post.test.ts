import faker from "faker";
import { sequelize } from "../../../src/config/sequelize";

import Post from "../../../src/models/userPosts";
import User from "../../../src/models/user";

import { IPostFullField, fakePost } from "../interfaces/post.interface";
import { fakeUser } from "../interfaces/user.interface";

afterAll(async () => {
    await sequelize.close();
});


describe("Post models", () => {
    describe("Post validation", () => {

        let newPost: IPostFullField;
        beforeEach(() => {
            newPost = fakePost;
        })

        test("Should throw a error if userId does not assign in DB", async () => {

            await expect(Post.create(newPost)).rejects.toThrow();
        })

        test("Should throw a error if userId does not exist", async () => {

            newPost.userId = faker.datatype.number(100);
            await expect(Post.create(newPost)).rejects.toThrow();
        });

        test("Should return a valid Post, Be sure to create User before test.", async () => {

            const newUser = await User.create(fakeUser);
            newPost.userId = newUser.id;

            await expect(Post.create(newPost)).resolves.toBeDefined();
        });
    })
})