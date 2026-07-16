import { describe, test, expect, beforeEach } from "vitest";
import { TimeProviderServiceImpl } from "../TImeProviderServiceImp";

let timeProvider: TimeProviderServiceImpl;

beforeEach(() => {
  timeProvider = new TimeProviderServiceImpl(); 
})

describe('currentDate', () => {

  test('should return a date closer to the current date', () => {
    const before = Date.now();
    const result = timeProvider.currentDate();
    const after = Date.now(); 

    expect(result.getTime()).toBeGreaterThanOrEqual(before);
    expect(result.getTime()).toBeLessThanOrEqual(after);
  })

 
})

describe('parseDate', () => {
   test('should parse a valid date string', () => {
    const result = timeProvider.parseDate('2026-03-24');

    expect(result).toEqual(new Date('2026-03-24'));
  })

  test('should return an invalid Date for an invalid string', () => {
    const result = timeProvider.parseDate('not-a-date');

    expect(isNaN(result.getTime())).toBe(true);
  })
})

describe('isOlderThan', () => {
  test('should return true if date is older than 24 hours', () => {
    const oldDate = new Date('2026-03-20'); 
    const duration = 24 * 60 * 60 * 1000;

    const result = timeProvider.isOlderThan(oldDate, duration);

    expect(result).toBe(true);
  })

  test('should return false if date is not older than 24 hours', () => {
    const recentDate = new Date(Date.now() - 1000);
    const duration = 24 * 60 * 60 * 1000;

    const result = timeProvider.isOlderThan(recentDate, duration); 

    expect(result).toBe(false);
  })
})