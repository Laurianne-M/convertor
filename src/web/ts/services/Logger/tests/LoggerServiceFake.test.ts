import { describe, test, expect, beforeEach } from "vitest";
import { LoggerServiceFake } from "../LoggerServiceFake";

describe('LoggerService', () => {
  let logger: LoggerServiceFake;

   beforeEach(() => {
    logger = new LoggerServiceFake();
  })

  test('should capture debug logs', () => {
    logger.debug('debug message'); 

    const debugLog = [{ level: 'debug', value: 'debug message'}];

    expect(logger.logs).toEqual(debugLog);
  })

  test('should capture info logs', () => {
    logger.info('info message');

    const infoLog = [{ level: 'info', value: 'info message' }];

    expect(logger.logs).toEqual(infoLog);
  })

  test('should capture warn message', () => {
    logger.warn('warn message');

    const warnLog = [{ level: 'warn', value: 'warn message' }];

    expect(logger.logs).toEqual(warnLog);
  })

  test('should capture error message', () => {
    logger.error('error message');

    const errorLog = [{ level: 'error', value: 'error message' }];

    expect(logger.logs).toEqual(errorLog);
  })

  test('should capture logs in order', () => {
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

  test('should start with empty logs', () => {
    expect(logger.logs).toEqual([]);
  })

})