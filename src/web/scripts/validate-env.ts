import fs from 'fs';

function validateUrlVariable(varName: string, urlValue: string, formattingErrors: string[]): void {
  if (urlValue.endsWith('/')) {
    formattingErrors.push(`${varName} must not have a trailing slash (received: "${urlValue}")`);
    return;
  }

  try {
    const urlObj = new URL(urlValue);
    const hostname = urlObj.hostname;
    const isLocal = hostname === 'localhost' || hostname === '127.0.0.1';

    const isFirebaseDomain = hostname.endsWith('.cloudfunctions.net');
    const hasValidDotStructure = hostname.includes('.') && !hostname.endsWith('.');

    if (!isLocal && !isFirebaseDomain && !hasValidDotStructure) {
      formattingErrors.push(`${varName} appears to be incomplete or malformed (received: "${urlValue}")`);
    }
  } catch {
    formattingErrors.push(`${varName} must be a valid URL (received: "${urlValue}")`);
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

function main(): number {
  const args = process.argv.slice(2);
  const [envFileName, ...requiredEnvVars] = args;

  if (!envFileName || !fs.existsSync(envFileName)) {
    console.error(`Environment Configuration Error: File "${envFileName}" not found.`);
    return 1;
  }

  const missingEnvVars: string[] = [];
  const formattingErrors: string[] = [];

  requiredEnvVars.forEach(envVar => {
    const urlValue = process.env[envVar]?.trim();

    if (!urlValue) {
      missingEnvVars.push(envVar);
      return;
    }

    if (envVar.includes('URL')) {
      validateUrlVariable(envVar, urlValue, formattingErrors);
    }
  });

  if (missingEnvVars.length > 0 || formattingErrors.length > 0) {
    printValidationErrors(envFileName, missingEnvVars, formattingErrors);
    return 1;
  }

  console.log(`Environment validation passed for ${envFileName}.`);
  return 0;
}

process.exit(main());