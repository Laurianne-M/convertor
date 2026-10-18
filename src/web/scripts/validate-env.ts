import fs from 'fs';

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

export function main(args: string[]): number {
  if (!args || args.length < 3) {
    console.error('Environment Configuration Error: Insufficient arguments provided.');
    return 1;
  }

  const [, , envFileName, ...requiredEnvVars] = args;

  if (!envFileName || !fs.existsSync(envFileName)) {
    console.error(`Environment Configuration Error: File "${envFileName}" not found.`);
    return 1;
  }

  const missingEnvVars: string[] = [];
  const formattingErrors: string[] = [];

  requiredEnvVars.forEach(envVar => {
    const URL = process.env[envVar]?.trim();

    if (!URL) {
      missingEnvVars.push(envVar);
      return;
    }

    if (envVar.includes('URL')) {
      validateURLVariable(envVar, URL, formattingErrors);
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
  process.exit(main(process.argv));
}