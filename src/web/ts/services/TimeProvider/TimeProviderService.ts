export interface TimeProvider {
  currentDate: () => Date;
  isOlderThan: (date: Date, ms: number) => boolean;
  parseDate: (dateString: string) => Date; 
}