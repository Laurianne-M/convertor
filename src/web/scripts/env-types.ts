/**
 * Supported data types for environment variable validation.
 */
export enum EnvironmentVariableType {
  STRING = 'string',
  URL = 'url',
}

/**
 * Configuration interface defining the environment file path and its required variables.
 */
export interface Environment {
  path: string;
  values: Record<string, EnvironmentVariableType>;
}