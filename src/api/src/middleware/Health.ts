import {type Response, type Request} from "express";
import {HTTPStatusCode} from "../models/HTTP.js";

/**
 * Middleware for checking the health of the application.
 * Returns a 200 status code and an "Ok" message.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 */
const health = (req: Request, res: Response) => {
  res.status(HTTPStatusCode.SUCCESS).json(
    {
      "message": "Ok",
      "status": HTTPStatusCode.SUCCESS,
    }
  );
};

export default health;
