import env from "../config/environments";


export const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Social Network",
            version: "1.0.0",
            description: "Build a social network website using typescript, express, sequelize,...",
        },
        servers: [
            {
                url: `http://localhost:${env.PORT}`,
            },
        ],
    },
    apis: ["./src/docs/*.yml", "./src/routes/v1/*.ts"],
};