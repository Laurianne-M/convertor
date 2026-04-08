import type { TimeProvider } from "./TimeProviderService";

export class TimeProviderService implements TimeProvider {

    currentDate = (): Date => {
        return new Date(); 
    }
}