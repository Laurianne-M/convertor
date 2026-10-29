import { describe, test, beforeEach, afterEach, expect, vi } from 'vitest';
import { main } from '../validate-env';
import fs from 'fs';

describe('main', () => {

  beforeEach(() => {
    vi.mock('fs');
    vi.mocked(fs.existsSync).mockReturnValue(true);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('should return exit code 1 when environment configuration is invalid or empty', () => {
    const exitCode = main({
      argv: ['node', 'validate-env.ts', 'path=.env.test', 'API_KEY=string', 'API_URL=url'],
      env: {},
    });

    expect(exitCode).toBe(1);
  });

  test('should return exit code 1 when path argument is missing', () => {
    const exitCode = main({ 
      argv: ['node', 'validate-env.ts', 'API_KEY=string', 'API_URL=url'],
      env: {
        API_KEY: 'secret-123',
        API_URL: 'https://api.example.com',
      },
    });

    expect(exitCode).toBe(1);
  });

  test('should return exit code 1 when file does not exist', () => {
    vi.mocked(fs.existsSync).mockReturnValue(false);

    const exitCode = main({
      argv: ['node', 'validate-env.ts', 'path=.env.test', 'API_KEY=string', 'API_URL=url'],
      env: {
        API_KEY: 'secret-123',
        API_URL: 'https://api.example.com',
      },
    });

    expect(exitCode).toBe(1);
  });

  test('should return exit code 1 when URL is missing', () => {
    const exitCode = main({
      argv: ['node', 'validate-env.ts', 'path=.env.test', 'API_KEY=string', 'API_URL=url'],
      env: {
        API_KEY: 'secret-123',
        API_URL: '',
      },
    });

    expect(exitCode).toBe(1);
  })

  test('should return exit code 1 when API key is missing', () => {
    const exitCode = main({
      argv: ['node', 'validate-env.ts', 'path=.env.test', 'API_KEY=string', 'API_URL=url'],
      env: {
        API_KEY: '',
        API_URL: 'https://api.example.com/v1',
      },
    });

    expect(exitCode).toBe(1);
  });

  test('should return exit code 1 when API_KEY and API_URL are empty string', () => {
    const exitCode = main({
      argv: ['node', 'validate-env.ts', 'path=.env.test', 'API_KEY=string', 'API_URL=url'],
      env: {
        API_KEY: '',
        API_URL: '',
      },
    });

    expect(exitCode).toBe(1);
  });

  test('should return exit code 1 when API key is present but URL is not a valid URL', () => {
    const exitCode = main({
      argv: ['node', 'validate-env.ts', 'path=.env.test', 'API_KEY=string', 'API_URL=url'],
      env: {
        API_KEY: 'secret-123',
        API_URL: 'not-a-valid-url',
      },
    });

    expect(exitCode).toBe(1);
  });

  test('should return exit code 0 when API key and valid URL are present', () => {
    const exitCode = main({
      argv: ['node', 'validate-env.ts', 'path=.env.test', 'API_KEY=string', 'API_URL=url'],
      env: {
        API_KEY: 'secret-123',
        API_URL: 'https://api.example.com',
      },
    });
    
    expect(exitCode).toBe(0);
  });
})