import fs from 'fs';

function validateURLVariable(varName: string, URLValue: string, formattingErrors: string[]): void {
  if (URLValue.endsWith('/')) {
    formattingErrors.push(`${varName} must not have a trailing slash (received: "${URLValue}")`);
    return;
  }

  try {
    const URLObj = new URL(URLValue);

    if (URLObj.protocol !== 'http:' && URLObj.protocol !== 'https:') {
      formattingErrors.push(`${varName} must use http or https protocol (received: "${URLValue}")`);
    }
  } catch {
    formattingErrors.push(`${varName} must be a valid URL (received: "${URLValue}")`);
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

export function main(args: string[] = process.argv.slice(2)): number {
  const [envFileName, ...requiredEnvVars] = args;

  if (!envFileName || !fs.existsSync(envFileName)) {
    console.error(`Environment Configuration Error: File "${envFileName}" not found.`);
    return 1;
  }

  const missingEnvVars: string[] = [];
  const formattingErrors: string[] = [];

  requiredEnvVars.forEach(envVar => {
    const URLValue = process.env[envVar]?.trim();

    if (!URLValue) {
      missingEnvVars.push(envVar);
      return;
    }

    if (envVar.includes('URL')) {
      validateURLVariable(envVar, URLValue, formattingErrors);
    }
  });

  if (missingEnvVars.length > 0 || formattingErrors.length > 0) {
    printValidationErrors(envFileName, missingEnvVars, formattingErrors);
    return 1;
  }

  console.log(`Environment validation passed for ${envFileName}.`);
  return 0;
}

if (require.main === module) {
  process.exit(main());
}