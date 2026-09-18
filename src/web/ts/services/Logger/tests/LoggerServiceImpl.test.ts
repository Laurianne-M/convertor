import { describe, test, vi, expect, beforeEach } from "vitest";
import { LoggerServiceImpl } from "../LoggerServiceImpl";

type LogMethod = "debug" | "warn" | "info" | "error";

describe('LoggerServiceImpl', () => {
  let logger: LoggerServiceImpl;


  beforeEach(() => {
    logger = new LoggerServiceImpl();
  })

  test.each([
    ['debug', 'debug'],
    ['warn', 'warn'], 
    ['info', 'info'],
    ['error', 'error']
  ] as const)('logger.%s() should call console.%s()', (method: LogMethod, consoleMethod: LogMethod) => {
    const spy = vi.spyOn(console, consoleMethod).mockImplementation(() => {});
    const message = `Testing ${method}`; 

    logger[method](message); 

    expect(spy).toHaveBeenCalledWith(message); 

    spy.mockRestore(); 
  });

   test.each([
    ['debug', 'debug'],
    ['warn', 'warn'], 
    ['info', 'info'],
    ['error', 'error']
  ] as const)('logger.%s() should call console.%s() even with object', (method: LogMethod, consoleMethod: LogMethod) => {
    const spy = vi.spyOn(console, consoleMethod).mockImplementation(() => {});
    const data = { id: 1, message: `Testing ${method}`}; 

    logger[method](data); 

    expect(spy).toHaveBeenCalledWith(data); 

    spy.mockRestore(); 
  });
})