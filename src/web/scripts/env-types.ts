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
 * Configuration interface defining the environment file path and its required variables.
 */
export interface Environment {
  /** The file path of the environment file being validated. */
  path: string;

  /** Names of expected environment variables and their expected concrete types. */
  keys: Record<string, EnvironmentVariableType>;

  /** Environment variable values. */
  values: Record<string, any>;
}

/**
 * Interface defining the command-line arguments and environment values injected into the validator.
 */
export interface EnvironmentCliOptions {
  argv: string[];
  env: Record<string, string | undefined>;
}