import {type Response, type Request} from "express";
import { HTTPStatusCode } from "../models/HTTP.js";

const health = (_: Request, res: Response) => {
  res.status(HTTPStatusCode.SUCCESS).json(
    {
      "message": "Ok",
      "status": HTTPStatusCode.SUCCESS,
    }
  );
};

export default health;