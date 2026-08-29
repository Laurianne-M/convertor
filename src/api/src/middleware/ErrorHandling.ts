import type {Request, Response, NextFunction} from "express";
import { DefaultInfoMessages } from "../models/testing/TestData.js";
import { ExchangeRateErrorType } from "../models/ExchangeRateErrorType.js";
import { HTTPStatusCode } from "../models/HTTP.js";

/**
 * Global catch-all error handling middleware.
 * Logs unexpected errors and returns the standard JSON error.
 * @param {Error} error - Unhandled exception passed down via next(error).
 * @param {Request} _req - Express Request object.
 * @param {Response} res - Express Response object.
 * @param {NextFunction} _ - Express callback (unused).
 * @return {Response} Express JSON error response.
 */
export function catchAll(
  error: Error,
  _req: Request,
  res: Response,
  _: NextFunction
): Response {
  console.error(error);

  return res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json({
    success: false,
    error: {
      code: HTTPStatusCode.INTERNAL_SERVER_ERROR,
      type: ExchangeRateErrorType.INTERNAL_SERVER_ERROR,
      info: DefaultInfoMessages.INTERNAL_SERVER_ERROR,
    },
  });
}

export default {
  catchAll,
};
