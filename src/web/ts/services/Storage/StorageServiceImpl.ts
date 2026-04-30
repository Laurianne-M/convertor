import type { StorageService } from "./StorageService";
import type { LoggerService } from "../Logger/LoggerService";

export class StorageServiceImpl implements StorageService {
  private logger: LoggerService; 

   constructor(
    logger: LoggerService,
  ) {
    this.logger = logger;
  }


  get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      if (item === null) return null;
      return JSON.parse(item) as T;
    } catch(error) {
      this.logger.error(`Failed to get the key in localStorage: ${key}`);
      return null
    }
  }

  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      this.logger.error(`Failed to save to localStorage: ${key}`);
    }
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}