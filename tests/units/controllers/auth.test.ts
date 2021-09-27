import faker from "faker";
import request from "supertest";

import { sequelize } from "../../../src/config/sequelize";

import server from "../../../src/server";


afterAll(async () => {
    await sequelize.close();
})

describe("/auth/", () => {

    describe("POST /auth/", () => {

        test("/signup", async () => {
            const newUser = await request(server)
                .post('/auth/signup')
                .send({
                    username: faker.internet.email().toLowerCase(),
                    password: "Thanh12341Hai",
                    password2: "Thanh12341Hai",
                    birthDay: faker.date.past(),
                    gender: "female",
                    firstName: "Thanh",
                    lastName: "Hai",

                });
           
            expect(newUser.statusCode).toBe(201);
        })
    })
})