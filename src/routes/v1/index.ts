import express from "express";

import swaggerRouter from "./docs.route";
import authRoutes from "./auth.route";
import userRoutes from "./user.route";
import messageRoutes from "./message.route";

import env from "../../config/environments";

const router: express.Router = express.Router();

type indexRoutesAttributes = {
    path: string,
    route: express.Router,
}

const indexRouteList: Array<indexRoutesAttributes> = [
    {
        path: "/auth",
        route: authRoutes,
    },
    {
        path: "/users",
        route: userRoutes,
    },
    {
        path: "/message",
        route: messageRoutes,
    }
];


const developmentRouteList: Array<indexRoutesAttributes> = [
    {
        path: "/docs",
        route: swaggerRouter,
    }
];

indexRouteList.forEach(route => router.use(route.path, route.route));

if (env.TYPE === "development") {
    developmentRouteList.forEach(route => router.use(route.path, route.route));
};

export default router;
