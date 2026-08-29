import express, {type Express} from "express";
import {createV1Router} from "./v1.js";
import {catchAll} from "../middleware/ErrorHandling.js";
import health from "./health.js";

const routes: Express = express();

routes.use("/v1", createV1Router(fetch));
routes.get("/health", health);
routes.use(catchAll);

export default routes;