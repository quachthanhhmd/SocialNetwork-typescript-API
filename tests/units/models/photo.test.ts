
import faker from "faker";
import db from "../../../src/models/index";
import { sequelize } from "../../../src/config/sequelize";

import Photo from "../../../src/models/photos";

import Post from "../../../src/models/userPosts";
import User from "../../../src/models/user";

import { IPhotoFullField } from "../interfaces/photo.interface";
import { IPostFullField, fakePost } from "../interfaces/post.interface";
import { IUserTestAllField, fakeUser } from "../interfaces/user.interface";



afterAll(async () => {
    await sequelize.close();
});


describe("Photo model", () => {
    describe("Photo validation", () => {

        let newPhoto: IPhotoFullField;
        beforeAll(() => {
            newPhoto = {
                id: faker.datatype.number(100),
                imageLink: faker.internet.avatar(),
                postId: faker.datatype.number(100),
            }
        });

        test("Should throw a error if post doesn't exist", async () => {
            await expect(Photo.create(newPhoto)).rejects.toThrow();
        });

        test("Should return a valid Photo", async () => {
            const user = await User.create(fakeUser);
            const post = await Post.create({ ...fakePost, userId: user.id });

            await expect(Photo.create({...newPhoto, postId: post.id})).resolves.toBeDefined();
        });

        test("Should throw a error if image is not a url", async() => {
            newPhoto.imageLink = "InValidURL";
            await expect(Photo.create(newPhoto)).rejects.toThrow();
        });
    })
})