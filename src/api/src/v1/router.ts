import { Router, type Response, type Request } from "express";

const router = Router();

router.get("/latest", (req: Request, res: Response) => {
  const API_KEY = process.env.VITE_EXCHANGE_RATES_API_KEY;
  const BASE_URL = 'https://api.exchangeratesapi.io/v1/latest';

  

}
)