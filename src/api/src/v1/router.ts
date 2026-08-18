import {Router, type Response, type Request} from "express";

export function createV1Router(fetchFn: typeof fetch = fetch) {
  // eslint-disable-next-line new-cap
  const router = Router();

  router.get("/latest", async (req: Request, res: Response) => {
    try {
      const API_KEY = process.env.VITE_EXCHANGE_RATES_API_KEY;
      const BASE_URL = `https://api.exchangeratesapi.io/v1/latest?access_key=${API_KEY}`;

      const response = await fetchFn(BASE_URL);
      const data = await response.json();

      if (!response.ok || data.success === false) {
        const statusCode = response.status !== 200 ? response.status : 500;
        return res.status(statusCode).json(data);
      }

      return res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch rates", status: 500 });
    }
  });

  return router;
}

export default createV1Router();
