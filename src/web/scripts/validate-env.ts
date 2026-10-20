import fs from 'fs';
import { EnvironmentVariableType } from './env-types';
import type { Environment } from './env-types';

function validateURLVariable(varName: string, URL: string, formattingErrors: string[]): void {
  const cleanURL = URL.replace(/^["']|["']$/g, '').trim();
  const validURLPattern = /^[a-zA-Z][a-zA-Z0-9+.-]*:\/\/.+[^/]$/;

  const domainOnlyPattern = /^[a-zA-Z][a-zA-Z0-9+.-]*:\/\/[^/]+$/;

  if (!validURLPattern.test(cleanURL) && !domainOnlyPattern.test(cleanURL)) {
    formattingErrors.push(
      `Environment Configuration Error: '${varName}' must be a valid URL and must not have a trailing slash (received: "${URL}").`
    );
  }
}

function printValidationErrors(envFileName: string, missingEnvVars: string[], formattingErrors: string[]): void {
  console.error(`Environment Configuration Error [${envFileName}]:`);

  if (missingEnvVars.length > 0) {
    console.error('The following required environment variables are missing or empty:');
    missingEnvVars.forEach(envVar => console.error(`  - ${envVar}`));
  }

  if (formattingErrors.length > 0) {
    console.error('The following environment variables have formatting errors:');
    formattingErrors.forEach(err => console.error(`  - ${err}`));
  }

  console.error(`\nPlease check your ${envFileName} file.`);
}

export function main(envConfig: Environment): number {
  if (!envConfig || !envConfig.path || !envConfig.values || Object.keys(envConfig.values).length === 0) {
    console.error('Environment Configuration Error: Invalid or empty environment configuration provided.');
    return 1;
  }

  const envFileName = envConfig.path;

  if (!envFileName || !fs.existsSync(envFileName)) {
    console.error(`Environment Configuration Error: File "${envFileName}" not found.`);
    return 1;
  }

  const missingEnvVars: string[] = [];
  const formattingErrors: string[] = [];

  for (const [envVar, expectedType] of Object.entries(envConfig.values)) {
    const value = process.env[envVar]?.trim();

    if (!value) {
      missingEnvVars.push(envVar);
      continue;
    }

    switch (expectedType) {
      case EnvironmentVariableType.URL:
        validateURLVariable(envVar, value, formattingErrors);
        break;
      case EnvironmentVariableType.STRING:
        break;
      default:
        console.error(`Environment Configuration Error: Unsupported type for variable '${envVar}'.`);
        return 1;
    }
  }

  if (missingEnvVars.length > 0 || formattingErrors.length > 0) {
    printValidationErrors(envFileName, missingEnvVars, formattingErrors);
    return 1;
  }

  console.log(`Environment validation passed for ${envFileName}.`);
  return 0;
}

if (require.main === module) {
  const environment: Environment = {
    path: process.argv[2] || '.env',
    values: {
      VITE_API_URL: EnvironmentVariableType.URL,
      VITE_EXCHANGE_RATES_API_KEY: EnvironmentVariableType.STRING,
    },
  };
  process.exit(main(environment));
}