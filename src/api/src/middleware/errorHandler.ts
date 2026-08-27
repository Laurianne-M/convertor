import type {Request, Response, NextFunction} from "express";
import {
  ExchangeRateCode,
  ExchangeRateErrorType,
  DefaultInfoMessages,
} from "../v1/router.constants.js";

/**
 * Global catch-all error handling middleware.
 * Logs unexpected errors and returns the standard JSON error.
 * @param {Error} error - Unhandled exception passed down via next(error).
 * @param {Request} _req - Express Request object.
 * @param {Response} res - Express Response object.
 * @param {NextFunction} _next - Express callback.
 * @return {Response} Express JSON error response.
 */
export function catchAll(
  error: Error,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
): Response {
  console.error(error);

  return res.status(500).json({
    success: false,
    error: {
      code: ExchangeRateCode.INTERNAL_SERVER_ERROR,
      type: ExchangeRateErrorType.INTERNAL_SERVER_ERROR,
      info: DefaultInfoMessages.INTERNAL_SERVER_ERROR,
    },
  });
}

export default {
  catchAll,
};
