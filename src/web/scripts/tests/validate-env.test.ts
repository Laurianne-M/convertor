import { describe, test, beforeEach, afterEach, expect, vi } from 'vitest';
import { main } from '../validate-env';
import type { EnvironmentCliOptions } from '../env-types';
import fs from 'fs';

describe('main', () => {
  let cliOptions: EnvironmentCliOptions;

  beforeEach(() => {
    vi.mock('fs');
    vi.mocked(fs.existsSync).mockReturnValue(true);

    cliOptions = {
      argv: ['node', 'validate-env.ts', 'path=.env.test', 'API_KEY=string', 'API_URL=url'],
      env: process.env,
    };
  });

  afterEach(() => {
    delete process.env.API_KEY;
    delete process.env.API_URL;

    vi.clearAllMocks();
  });

  test('should return exit code 1 when environment configuration is invalid or empty', () => {
    const exitCode = main({ argv: ['node', 'validate-env.ts'], env: {} });
    expect(exitCode).toBe(1);
  });

  test('should return exit code 1 when path argument is missing', () => {
    const exitCode = main({ argv: ['node', 'validate-env.ts', 'API_KEY=string'], env: {} });
    expect(exitCode).toBe(1);
  });

  test('should return exit code 1 when file does not exist', () => {
    vi.mocked(fs.existsSync).mockReturnValue(false);
    const exitCode = main(cliOptions);
    expect(exitCode).toBe(1);
  });

  test('should return exit code 1 when URL is missing', () => {
    process.env.API_KEY = 'secret-123';
    process.env.API_URL = '';

    const exitCode = main(cliOptions);
    expect(exitCode).toBe(1);
  })

  test('should return exit code 1 when API key is missing', () => {
    process.env.API_KEY = '';
    process.env.API_URL = 'https://api.example.com/v1';

    const exitCode = main(cliOptions);
    expect(exitCode).toBe(1);
  });

  test('should return exit code 1 when both are missing', () => {
    process.env.API_KEY = '';
    process.env.API_URL = '';

    const exitCode = main(cliOptions);
    expect(exitCode).toBe(1);
  });

  test('should return exit code 1 when API key is present but URL is not a valid URL', () => {
    process.env.API_KEY = 'secret-123';
    process.env.API_URL = 'not-a-valid-url';

    const exitCode = main(cliOptions);
    expect(exitCode).toBe(1);
  });

  test('should return exit code 0 when API key and valid URL are present', () => {
    process.env.API_KEY = 'secret-123';
    process.env.API_URL = 'https://api.example.com';

    const exitCode = main(cliOptions);
    expect(exitCode).toBe(0);
  });
})