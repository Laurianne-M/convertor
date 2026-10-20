import { describe, test, beforeEach, afterEach, expect, vi } from 'vitest';
import { main } from '../validate-env';
import { EnvironmentVariableType } from '../env-types';
import type { Environment } from '../env-types';
import fs from 'fs';

describe('main', () => {
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;
  let consoleLogSpy: ReturnType<typeof vi.spyOn>;
  let config: Environment;

  beforeEach(() => {
    vi.mock('fs');
    vi.clearAllMocks();
    // Silence console outputs during tests to keep the test runner clean
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.mocked(fs.existsSync).mockReturnValue(true);

    config = {
      path: '.env.test',
      values: {
        API_KEY: EnvironmentVariableType.STRING,
        API_URL: EnvironmentVariableType.URL,
      },
    };
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
    consoleLogSpy.mockRestore();

    delete process.env.API_KEY;
    delete process.env.API_URL;
  });

  test('should return exit code 1 when environment configuration is invalid or empty', () => {
    const exitCode = main({ path: '', values: {} } as Environment);
    expect(exitCode).toBe(1);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Environment Configuration Error: Invalid or empty environment configuration provided.'
    );
  });

  test('should return exit code 1 when URL is missing', () => {
    process.env.API_KEY = 'secret-123';
    process.env.API_URL = '';

    const exitCode = main(config);
    expect(exitCode).toBe(1);
  })

  test('should return exit code 1 when API key is missing', () => {
    process.env.API_KEY = '';
    process.env.API_URL = 'https://api.example.com/v1';

    const exitCode = main(config);
    expect(exitCode).toBe(1);
  });

  test('should return exit code 1 when both are missing', () => {
    process.env.API_KEY = '';
    process.env.API_URL = '';

    const exitCode = main(config);
    expect(exitCode).toBe(1);
  });

  test('should return exit code 1 when API key is present but URL is not a valid URL', () => {
    process.env.API_KEY = 'secret-123';
    process.env.API_URL = 'not-a-valid-url';

    const exitCode = main(config);
    expect(exitCode).toBe(1);
  });

  test('should return exit code 0 when API key and valid URL are present', () => {
    process.env.API_KEY = 'secret-123';
    process.env.API_URL = 'https://api.example.com';

    const exitCode = main(config);
    expect(exitCode).toBe(0);
  });
})