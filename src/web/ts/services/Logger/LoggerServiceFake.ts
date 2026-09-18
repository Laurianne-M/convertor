import type { LoggerService } from "./LoggerService";

export class LoggerServiceFake implements LoggerService {
  public logs: {level: string; value: unknown }[] = [];

  debug(value: unknown): void {
    this.logs.push({ level: 'debug', value });
  }

    info(value: unknown): void {
    this.logs.push({ level: 'info', value });
  }

  warn(value: unknown): void {
    this.logs.push({ level: 'warn', value });
  }

  error(value: unknown): void {
    this.logs.push({ level: 'error', value }); 
  }
}