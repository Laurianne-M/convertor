import type { TimeProvider } from "./TimeProviderService";

export class TimeProviderServiceImpl implements TimeProvider {
  currentDate = (): Date => {
    return new Date();
  }
}