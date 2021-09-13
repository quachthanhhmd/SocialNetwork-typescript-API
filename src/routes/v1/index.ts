import express from "express";

import swaggerRouter from "./docs.route";
import env from "../../config/environments";

const router: express.Router = express.Router();

type indexRoutesAttributes = {
    path: string,
    route: express.Router,
}

const indexRouteList: Array<indexRoutesAttributes> = [];


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
