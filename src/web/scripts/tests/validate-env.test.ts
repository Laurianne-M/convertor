import { describe, test, beforeEach, afterEach, expect, vi } from 'vitest';
import { validateURLVariable, printValidationErrors } from '../validate-env';

describe('valideURVariable', () => {
  let formattingErrors: string[];

  beforeEach(() => {
    formattingErrors = [];
  });

  test('should push an error if the URL ends with a trailing slash', () => {
    validateURLVariable('API_URL', 'https://api.example.com/', formattingErrors);

    expect(formattingErrors).toHaveLength(1);
    expect(formattingErrors[0]).toContain('must not have a trailing slash');
  })

  test('should push an error if the protocol is not http or https', () => {
    validateURLVariable('API_URL', 'ftp://api.example.com', formattingErrors);

    expect(formattingErrors).toHaveLength(1);
    expect(formattingErrors[0]).toContain('must use http or https protocol');
  });

  test('should push an error if the string is not a valid URL', () => {
    validateURLVariable('API_URL', 'not-a-valid-url', formattingErrors);

    expect(formattingErrors).toHaveLength(1);
    expect(formattingErrors[0]).toContain('must be a valid URL');
  });

  test('should not push any errors for a valid https URL', () => {
    validateURLVariable('API_URL', 'https://api.example.com/v1', formattingErrors);

    expect(formattingErrors).toHaveLength(0);
  });

  test('should not push any errors for a valid localhost URL', () => {
    validateURLVariable('API_URL', 'http://localhost:3000', formattingErrors);

    expect(formattingErrors).toHaveLength(0);
  });
})

describe('printValidationErrors', () => {
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    // Spy on console.error and mock its implementation so it doesn't print during tests
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  test('should print missing environment variables correctly', () => {
    printValidationErrors('.env.test', ['API_KEY', 'API_URL'], []);

    expect(consoleErrorSpy).toHaveBeenCalledWith('Environment Configuration Error [.env.test]:');
    expect(consoleErrorSpy).toHaveBeenCalledWith('The following required environment variables are missing or empty:');
    expect(consoleErrorSpy).toHaveBeenCalledWith('- API_KEY');
    expect(consoleErrorSpy).toHaveBeenCalledWith('- API_URL');
  });

  test('should print formatting errors correctly', () => {
    printValidationErrors('.env.test', [], ['API_URL must be a valid URL']);

    expect(consoleErrorSpy).toHaveBeenCalledWith('Environment Configuration Error [.env.test]:');
    expect(consoleErrorSpy).toHaveBeenCalledWith('The following environment variables have formatting errors:');
    expect(consoleErrorSpy).toHaveBeenCalledWith('- API_URL must be a valid URL');
  });
});