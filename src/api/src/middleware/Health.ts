import {type Response, type Request} from "express";
import { HTTPStatusCode } from "../models/HTTP.js";

/**
 * Middleware for checking the health of the application.
 * Returns a 200 status code and an "Ok" message.
 * 
 * @param req - The Express request object.
 * @param res - The Express response object.
 */
const health = (_: Request, res: Response) => {
  res.status(HTTPStatusCode.SUCCESS).json(
    {
      "message": "Ok",
      "status": HTTPStatusCode.SUCCESS,
    }
  );
};

export default health;