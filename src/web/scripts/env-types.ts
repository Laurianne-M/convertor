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

  /** A environment variable map names to their expected validation types. */
  variables: Record<string, EnvironmentVariableType>;

  /** environment values at runtime. */
  values: Record<string, any>;
}