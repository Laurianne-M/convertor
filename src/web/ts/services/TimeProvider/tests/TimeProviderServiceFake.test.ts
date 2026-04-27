import { describe, it, expect, beforeEach } from "vitest";
import { TimeProviderServiceFake } from "../TimeProviderServiceFake";

let timeProviderFake: TimeProviderServiceFake; 

beforeEach(() => {
  timeProviderFake = new TimeProviderServiceFake(new Date('2026-03-24')); 
})

describe('currentDate', () => {
  it('should return the initial time', () => {
    const result = timeProviderFake.currentDate(); 

    expect(result).toEqual(new Date('2026-03-24'))
  })


})

describe('parseDate', () => {
  it('should parse a valid date string', () => {
    const result = timeProviderFake.parseDate('2026-03-24'); 

     expect(result).toEqual(new Date('2026-03-24'));
  })

  it('should return an invalid Date for an invalid string', () => {
    const result = timeProviderFake.parseDate('not-a-date');

    expect(isNaN(result.getTime())).toBe(true);
  })
})

describe('isOlderThan', () => {
  it('should return true if the date is older than 24 hours', () => {
    const oldDate = new Date('2026-03-20');
    const duration =  24 * 60 * 60 * 1000;

    const result = timeProviderFake.isOlderThan(oldDate, duration);

    expect(result).toBe(true)                                  
  })

  it('should return false if the date is not older than 24 hours', () => {
    const recentDate = new Date('2026-03-24'); 
    const duration = 24 * 60 * 60 * 1000;

    const result = timeProviderFake.isOlderThan(recentDate, duration); 

    expect(result).toBe(false);
  })
})