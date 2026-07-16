import { describe, test, vi, expect, beforeEach } from "vitest";
import { LoggerServiceImpl } from "../LoggerServiceImpl";


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
  ])('logger.%s() should call console.%s()', (method, consoleMethod) => {
    const spy = vi.spyOn(console, consoleMethod as any).mockImplementation(() => {});
    const message = `Testing ${method}`; 

    (logger as any)[method](message); 

    expect(spy).toHaveBeenCalledWith(message); 

    spy.mockRestore(); 
  });

   test.each([
    ['debug', 'debug'],
    ['warn', 'warn'], 
    ['info', 'info'],
    ['error', 'error']
  ])('logger.%s() should call console.%s() even with object', (method, consoleMethod) => {
    const spy = vi.spyOn(console, consoleMethod as any).mockImplementation(() => {});
    const data = { id: 1, message: `Testing ${method}`}; 

    (logger as any)[method](data); 

    expect(spy).toHaveBeenCalledWith(data); 

    spy.mockRestore(); 
  });
})