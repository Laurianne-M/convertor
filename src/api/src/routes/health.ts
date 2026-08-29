import {type Response, type Request} from "express";

const health = (_: Request, res: Response) => {
  res.status(200).json(
    {
      "message": "Ok",
      "status": 200,
    }
  );
};

export default health;