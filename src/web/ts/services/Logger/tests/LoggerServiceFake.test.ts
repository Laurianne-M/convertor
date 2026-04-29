import { describe, it, vi, expect, beforeEach } from "vitest";
import { LoggerServiceFake } from "../LoggerServiceFake";

describe('LoggerService', () => {
  let logger: LoggerServiceFake;

   beforeEach(() => {
    logger = new LoggerServiceFake();
  })

  it('should capture debug logs', () => {
    logger.debug('debug message'); 

    const debugLog = [{ level: 'debug', value: 'debug message'}];

    expect(logger.logs).toEqual(debugLog);
  })

  it('should capture info logs', () => {
    logger.info('info message');

    const infoLog = [{ level: 'info', value: 'info message' }];

    expect(logger.logs).toEqual(infoLog);
  })

  it('should capture warn message', () => {
    logger.warn('warn message');

    const warnLog = [{ level: 'warn', value: 'warn message' }];

    expect(logger.logs).toEqual(warnLog);
  })

  it('should capture error message', () => {
    logger.error('error message');

    const errorLog = [{ level: 'error', value: 'error message' }];

    expect(logger.logs).toEqual(errorLog);
  })

  it('should capture logs in order', () => {
    logger.debug('debug message');
    logger.info('info message');
    logger.warn('warn message');
    logger.error('error message');

    const logsInOrder = [
      { level: 'debug', value: 'debug message' },
      { level: 'info', value: 'info message' },
      { level: 'warn', value: 'warn message' },
      { level: 'error', value: 'error message' },
    ]

    expect(logger.logs).toEqual(logsInOrder);

  })

  it('should start with empty logs', () => {
    expect(logger.logs).toEqual([]);
  })

})