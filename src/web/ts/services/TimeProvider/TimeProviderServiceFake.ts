import type { TimeProvider } from "./TimeProviderService";

export class TimeProviderServiceFake implements TimeProvider {
  private currentTime: Date;

  constructor(initialTime: Date) {
    this.currentTime = initialTime;
  }

  currentDate = (): Date => {
    return new Date(this.currentTime);
  }

  advanceTime(ms: number): void {
    this.currentTime = new Date(this.currentTime.getTime() - ms)
  }

  isOlderThan = (date: Date, ms: number): boolean => {
     return this.currentDate().getTime() - date.getTime() > ms;
  }

  parseDate = (dateString: string): Date => new Date(dateString);
}