import {onRequest} from "firebase-functions/https";
import express, {type Express, type Response, type Request} from "express";
import v1Router from "./v1/router.js";
import {catchAll} from "./middleware/errorHandler.js";

export const app: Express = express();

app.use("/v1", v1Router);

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json(
    {
      "message": "Ok",
      "status": 200,
    }
  );
});

app.use(catchAll);

export const api = onRequest(app);
