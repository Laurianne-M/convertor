import type { StorageService } from "./StorageService";

export class StorageServiceFake implements StorageService {
  private store = new Map<string, string>();

  get<T>(key: string): T | null {
    const item = this.store.get(key);
    if (item === undefined) return null;
    return JSON.parse(item) as T;
  }

  set<T>(key: string, value: T): void {
    this.store.set(key, JSON.stringify(value));
  }

  remove(key: string): void {
    this.store.delete(key);
  }

  clear(): void {
    this.store.clear();
  }
}