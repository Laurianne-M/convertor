import { describe, test, expect, vi } from 'vitest';
import { type Request, type Response } from 'express';
import health from '../Health.js';
import { HTTPStatusCode } from '../../models/HTTP.js';

describe('/health', () => {
  test('should return a 200 status and an "Ok" message', () => {
    const mockRequest = {} as Request;
    
    const mockResponse = {
      status: vi.fn().mockReturnThis(), 
      json: vi.fn(),
    } as unknown as Response;

    health(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(HTTPStatusCode.SUCCESS);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'Ok',
      status: HTTPStatusCode.SUCCESS,
    });
  });
});