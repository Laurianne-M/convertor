import type { TimeProvider } from "./TimeProviderService";

export class TimeProviderServiceImpl implements TimeProvider {
  currentDate = (): Date => {
    return new Date();
  }

  parseDate = (dateString: string): Date => new Date(dateString);

  isOlderThan = (date: Date, ms: number): boolean => {
    return this.currentDate().getTime() - date.getTime() > ms;
  }
}