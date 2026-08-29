import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { type Request, type Response, type NextFunction } from 'express';
import { catchAll } from '../ErrorHandling.js';
import { DefaultInfoMessages } from "../../models/testing/TestData.js";
import { ExchangeRateErrorType } from "../../models/ExchangeRateErrorType.js";
import { HTTPStatusCode } from "../../models/HTTP.js";

describe('catchAll Error Handler', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('should log the error and return a 500 status with error details', () => {
    const mockError = new Error('Test unhandled exception');
    const mockRequest = {} as Request;
    
    const mockResponse = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response;
    
    const mockNext = vi.fn() as NextFunction;

    catchAll(mockError, mockRequest, mockResponse, mockNext);

    expect(mockNext).not.toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith(mockError);
    expect(mockResponse.status).toHaveBeenCalledWith(
      HTTPStatusCode.INTERNAL_SERVER_ERROR
    );
    expect(mockResponse.json).toHaveBeenCalledWith({
      success: false,
      error: {
        code: HTTPStatusCode.INTERNAL_SERVER_ERROR,
        type: ExchangeRateErrorType.INTERNAL_SERVER_ERROR,
        info: DefaultInfoMessages.INTERNAL_SERVER_ERROR,
      },
    });
  });
});