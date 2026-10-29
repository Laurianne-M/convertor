import fs from 'fs';
import { EnvironmentVariableType } from './env-types';
import type { Environment, EnvironmentCliOptions } from './env-types';

function validateURL({ name, value }: { name: string; value: string }): string | null {
  const cleanURL = value.replace(/^["']|["']$/g, '').trim();
  const validURLPattern = /^[a-zA-Z][a-zA-Z0-9+.-]*:\/\/.+[^/]$/;
  const domainOnlyPattern = /^[a-zA-Z][a-zA-Z0-9+.-]*:\/\/[^/]+$/;

  if (!validURLPattern.test(cleanURL) && !domainOnlyPattern.test(cleanURL)) {
    return `Environment Configuration Error: '${name}' must be a valid URL and must not have a trailing slash (received: "${value}").`;
  }

  return null;
}

function printErrorSection(description: string, errors: string[]): void {
  if (errors.length === 0) return;
  console.error(description);
  errors.forEach(error => console.error(`\t- ${error}`));
}

function printValidationErrors(envFileName: string, missingEnvVars: string[], formattingErrors: string[]): void {
  console.error(`Environment Configuration Error [${envFileName}]:`);

  printErrorSection(
    'The following required environment variables are missing or empty:',
    missingEnvVars
  );

 printErrorSection(
    'The following environment variables have formatting errors:',
    formattingErrors
  );

  console.error(`\nPlease check your ${envFileName} file.`);
}

export function main(options: EnvironmentCliOptions): number {
  const args = options.argv.slice(2);

  if (args.length === 0) {
    console.error('Environment Configuration Error: Missing arguments.');
    console.error('Usage: npx tsx validate-env.ts path=<path-to-env> KEY=type ...');
    return 1;
  }

  let envPath = '';
  const variables: Record<string, EnvironmentVariableType> = {};

  // parse arguments like path=... and API_URL=url
  for (const arg of args) {
    if (arg.startsWith('path=')) {
      envPath = arg.substring(5);
    } else if (arg.includes('=')) {
      const [key, rawType] = arg.split('=');
      if (key && rawType) {
        const normalizedType = rawType.toLowerCase();
        variables[key] = normalizedType === 'url' 
          ? EnvironmentVariableType.URL 
          : EnvironmentVariableType.STRING;
      }
    }
  }

  if (!envPath) {
    console.error('Environment Configuration Error: Missing "path=" argument.');
    return 1;
  }

  if (Object.keys(variables).length === 0) {
    console.error('Environment Configuration Error: No variables specified for validation.');
    return 1;
  }

  if (!fs.existsSync(envPath)) {
    console.error(`Environment Configuration Error: File "${envPath}" not found.`);
    return 1;
  }

  const environment: Environment = {
    path: envPath,
    variables,
    values: options.env,
  };

  if (!environment || !environment.path || !environment.variables || Object.keys(environment.variables).length === 0) {
    console.error('Environment Configuration Error: Invalid or empty environment configuration provided.');
    return 1;
  }

  if (!environment.path || !fs.existsSync(environment.path)) {
    console.error(`Environment Configuration Error: File "${environment.path}" not found.`);
    return 1;
  }

  const missingEnvVars: string[] = [];
  const formattingErrors: string[] = [];

  for (const [envVar, expectedType] of Object.entries(environment.variables)) {
    const value = environment.values[envVar]?.trim();

    if (!value) {
      missingEnvVars.push(envVar);
      continue;
    }

    switch (expectedType) {
      case EnvironmentVariableType.URL: {
        const URLError = validateURL({
          name: envVar,
          value: value,
        });

        if (URLError) {
          formattingErrors.push(URLError);
        }
        break;
      }
      case EnvironmentVariableType.STRING:
        break;
      default:
        console.error(`Environment Configuration Error: Unsupported type for variable '${envVar}'.`);
        return 1;
    }
  }

  if (missingEnvVars.length > 0 || formattingErrors.length > 0) {
    printValidationErrors(environment.path, missingEnvVars, formattingErrors);
    return 1;
  }

  console.log(`Environment validation passed for ${environment.path}.`);
  return 0;
}

if (require.main === module) {
  process.exit(main({argv: process.argv, env: process.env}));
}