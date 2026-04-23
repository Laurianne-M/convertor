import type { LoggerService } from "./LoggerService";


export class LoggerServiceImpl implements LoggerService {
  debug(value: any): void {
    console.debug(value);
  }

    info(value: any): void {
    console.info(value);
  }

  warn(value: any): void {
    console.warn(value);
  }

  error(value: any): void {
    console.error(value); 
  }

}