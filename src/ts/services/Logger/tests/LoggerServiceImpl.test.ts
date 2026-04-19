import { describe, it, vi, expect, beforeEach, afterEach, createExpect } from "vitest";
import { LoggerServiceImpl } from "../LoggerServiceImpl";


describe('LoggerServiceImpl', () => {
  let logger: LoggerServiceImpl;
  let warnSpy: any;
  let errorSpy: any;
  let infoSpy: any;
  let debugSpy: any;


  beforeEach(() => {
    logger = new LoggerServiceImpl();
    warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    infoSpy = vi.spyOn(console, 'info').mockImplementation(() => {});
    debugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});
    
  })

  afterEach(() => {
    warnSpy.mockRestore(); 
    errorSpy.mockRestore();
    infoSpy.mockRestore();
    debugSpy.mockRestore(); 
  })
  it('should return console.info when called', () => {
    const message = 'Test info messsage';

    logger.info(message);

    expect(infoSpy).toHaveBeenCalledOnce();
    expect(infoSpy).toHaveBeenCalledWith(message);
  })

  it('should return console.warn when called', () => {
    const message = 'Test warning message';

    logger.warn(message);

    expect(warnSpy).toHaveBeenCalledOnce();
    expect(warnSpy).toHaveBeenCalledWith(message); 
  })

  it('should return console.error when called', () => {
    const message = 'Test error message'; 

    logger.error(message);

    expect(errorSpy).toHaveBeenCalledOnce();
    expect(errorSpy).toHaveBeenCalledWith(message); 

  })

  it('should return console.debug when called', () => {
    const message = 'Test debug message'; 

    logger.debug(message); 

    expect(debugSpy).toHaveBeenCalledOnce();
    expect(debugSpy).toHaveBeenCalledWith(message); 

  })
})