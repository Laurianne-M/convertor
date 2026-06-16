import { describe, it, expect, beforeEach } from "vitest";
import { TimeProviderServiceFake } from "../TimeProviderServiceFake";

describe('TimeProviderServiceFake', () => {
  let timeProviderFake: TimeProviderServiceFake; 

  beforeEach(() => {
    timeProviderFake = new TimeProviderServiceFake(); 
  })

  describe('currentDate', () => {
    it('defaults to epoque', () => {
      const result = timeProviderFake.currentDate(); 
      expect(result).toEqual(new Date('1970-01-01T00:00:00Z'));
    })

    it('returns the overridden current date', () => {
      timeProviderFake.overrides.currentDate = new Date('2026-03-24');
      const result = timeProviderFake.currentDate(); 
      expect(result).toEqual(new Date('2026-03-24'));
    })
  })

  describe('parseDate', () => {
    it('defaults to epoque', () => {
      const result = timeProviderFake.parseDate('any date string'); 
      expect(result).toEqual(new Date('1970-01-01T00:00:00Z'));
    })

    it('returns the overridden parsed date', () => {
      timeProviderFake.overrides.parsedDate = new Date('2026-03-24');
      const result = timeProviderFake.parseDate('any date string'); 
      expect(result).toEqual(new Date('2026-03-24'));
    })
  })

  describe('isOlderThan', () => {
    it('defaults to false', () => {
      const result = timeProviderFake.isOlderThan(new Date(), 1000); 
      expect(result).toBe(false);
    })

    it('returns the overridden isOlderThan value', () => {
      timeProviderFake.overrides.isOlderThan = true;
      const result = timeProviderFake.isOlderThan(new Date(), 1000); 
      expect(result).toBe(true);
    })
  })
})