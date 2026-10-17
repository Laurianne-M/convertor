import { describe, test, beforeEach, afterEach, expect, vi } from 'vitest';
import { main } from '../validate-env';
import fs from 'fs';

vi.mock('fs');

describe('main ', () => {
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;
  let consoleLogSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    vi.clearAllMocks();
    // Silence console outputs during tests to keep the test runner clean
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.mocked(fs.existsSync).mockReturnValue(true);
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
    consoleLogSpy.mockRestore();
    delete process.env.API_KEY;
    delete process.env.API_URL;
  });

  test('should return exit code 1 when URL is missing', () => {
    process.env.API_KEY = 'secret-123';
    delete process.env.API_URL;

    const exitCode = main(['.env.test', 'API_KEY', 'API_URL']);
    expect(exitCode).toBe(1);
  })

  test('should return exit code 1 when API key is missing', () => {
    delete process.env.API_KEY;
    process.env.API_URL = 'https://api.example.com/v1';

    const exitCode = main(['.env.test', 'API_KEY', 'API_URL']);
    expect(exitCode).toBe(1);
  });

  test('should return exit code 1 when both are missing', () => {
    delete process.env.API_KEY;
    delete process.env.API_URL;

    const exitCode = main(['.env.test', 'API_KEY', 'API_URL']);
    expect(exitCode).toBe(1);
  });

  test('should return exit code 1 when API key is present but URL is not a valid URL', () => {
    process.env.API_KEY = 'secret-123';
    process.env.API_URL = 'not-a-valid-url';

    const exitCode = main(['.env.test', 'API_KEY', 'API_URL']);
    expect(exitCode).toBe(1);
  });

  test('should return exit code 0 when API key and valid URL are present', () => {
    process.env.API_KEY = 'secret-123';
    process.env.API_URL = 'https://api.example.com';

    const exitCode = main(['.env.test', 'API_KEY', 'API_URL']);
    expect(exitCode).toBe(0);
  });
})