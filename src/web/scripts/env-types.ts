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
  argv: string[];
  env: Record<string, string | undefined>;
}