import type { LoggerService } from "./LoggerService";

export class LoggerServiceFake implements LoggerService {
  debug(value: any): void {
    false
  }

    info(value: any): void {
    false
  }

  warn(value: any): void {
    false
  }

  error(value: any): void {
    false 
  }
}