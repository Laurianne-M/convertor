export enum EnvironmentVariableType {
  STRING = 'string',
  URL = 'url',
}

export interface Environment {
  path: string;
  values: Record<string, EnvironmentVariableType>;
}