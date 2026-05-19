import type { TimeProvider } from "./TimeProviderService";

export interface TimeProviderServiceFakeOverrides {
  currentDate?: Date,
  isOlderThan?: boolean
  parsedDate?: Date
}

const epoque = new Date("1970-01-01T00:00:00Z")

const defaultOverrides: TimeProviderServiceFakeOverrides = {
  currentDate: epoque,
  isOlderThan: false,
  parsedDate: epoque
}

export class TimeProviderServiceFake implements TimeProvider {
  public overrides: TimeProviderServiceFakeOverrides

  constructor(overrides: TimeProviderServiceFakeOverrides = defaultOverrides) {
    this.overrides = overrides;
  }

  currentDate = (): Date => {
    return this.overrides.currentDate || epoque;
  }

  isOlderThan = (date: Date, ms: number): boolean => {
     return this.overrides.isOlderThan || false;
  }

  parseDate = (dateString: string): Date => {
    return this.overrides.parsedDate || epoque
  }
}