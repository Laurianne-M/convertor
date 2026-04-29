import type { LoggerService } from "./LoggerService";

export class LoggerServiceFake implements LoggerService {
  public logs: {level: string; value: any }[] = [];

  debug(value: any): void {
    this.logs.push({ level: 'debug', value });
  }

    info(value: any): void {
    this.logs.push({ level: 'info', value });
  }

  warn(value: any): void {
    this.logs.push({ level: 'warn', value });
  }

  error(value: any): void {
    this.logs.push({ level: 'error', value }); 
  }
}