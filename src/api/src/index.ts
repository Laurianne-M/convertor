import {onRequest} from "firebase-functions/https";
import express, {type Express, type Response, type Request} from "express";

const app: Express = express();

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json(
    {
      "message": "Ok",
      "status": 200,
    }
  );
});

export const api = onRequest(app);
