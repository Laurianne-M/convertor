import { describe, it, expect } from "vitest";
import { TimeProviderServiceImpl } from "../TImeProviderServiceImp";

describe('TimeProviderServiceImpl', () => {
  it('should return the current date', () => {
    const timeProvider = new TimeProviderServiceImpl(); 

    const result = timeProvider.currentDate()


    expect(result.toISOString().split('T')[0]).toBe(new Date().toISOString().split('T')[0])
  })
})