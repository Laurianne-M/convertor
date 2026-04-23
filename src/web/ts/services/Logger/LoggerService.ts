export interface LoggerService {
  debug(value: any): void; 
  info(value: any): void; 
  warn(value: any): void; 
  error(value:any): void;
}