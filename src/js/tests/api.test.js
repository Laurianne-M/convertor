import { describe, it, expect, beforeEach, vi } from "vitest";
import { getMockRates, loadRates } from "../api/api.js";
import { html } from "../element.js";

describe('LoadRates', () => {
    it('should download mockup data if API request is available', async () => {
        const data = await loadRates();

        const mockData = getMockRates(); 

        expect(data).toStrictEqual(mockData);
    });
})