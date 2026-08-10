import {onRequest} from "firebase-functions/https";
import express, {type Express, type Response, type Request} from "express";

const app: Express = express();
const PORT = 3000;

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json(
    {
      "message": "Ok",
      "status": 200,
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/health`);
});

export const api = onRequest(app);
