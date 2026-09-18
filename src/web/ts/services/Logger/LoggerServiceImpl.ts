import type { LoggerService } from "./LoggerService";


export class LoggerServiceImpl implements LoggerService {
  debug(value: unknown): void {
    console.debug(value);
  }

    info(value: unknown): void {
    console.info(value);
  }

  warn(value: unknown): void {
    console.warn(value);
  }

  error(value: unknown): void {
    console.error(value); 
  }

}