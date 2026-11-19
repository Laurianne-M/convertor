/**
 * Supported data types for environment variable validation.
 */
export enum EnvironmentVariableType {
  /** String variable with no special formatting requirements. */
  STRING = 'string',

  /** URL format variable that must conform to URL validation rules. */
  URL = 'url',
}

/**
 * Interface defining the command-line arguments and environment values injected into the validator.
 */
export interface EnvironmentCLIOptions {
  /** Command-line argument vector passed to the execution context (e.g., process.argv). */
  argv: string[];

  /** Key-value pairs representing environment variables available during validation. */
  env: Record<string, string | undefined>;
}