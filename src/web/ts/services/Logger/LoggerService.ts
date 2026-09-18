export interface LoggerService {
  debug(value: unknown): void; 
  info(value: unknown): void; 
  warn(value: unknown): void; 
  error(value:unknown): void;
}