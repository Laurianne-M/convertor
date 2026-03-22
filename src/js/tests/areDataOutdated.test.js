import { describe, vi, it, expect, beforeEach, afterEach } from "vitest";
import { areDataOutdated } from "../api/api";

describe('areDataOutdated', () => {
    
    beforeEach(() => {
        vi.useFakeTimers();
    } );

    afterEach(() => {
        vi.useRealTimers();
    })

    it('should return true if there is no data', () => {
        const receivedAt = null;

        expect(areDataOutdated(receivedAt)).toBe(true); 
    } );

    it('should return true if the timestamp is not a number', () => {
        const receivedAt = 'not a number'; 

        expect(areDataOutdated(receivedAt)).toBe(true); 
    } ); 

    it('should return true if data is older than 24 hours', () => {
        vi.setSystemTime(new Date('2026-03-22'));

        const oldDate = new Date('2026-03-20').toISOString();

        expect(areDataOutdated(oldDate)).toBe(true); 
    } );

    it('should return false if data is not older than 24 hours', () => {
        vi.setSystemTime(new Date('2026-03-22'));

        const today = new Date('2026-03-22').toISOString(); 

        expect(areDataOutdated(today)).toBe(false); 
    })

} )