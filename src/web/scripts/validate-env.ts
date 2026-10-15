const requiredEnvVars = ['VITE_API_URL', 'VITE_EXCHANGE_RATES_API_KEY'] as const;

function main(): number {
  const missing = requiredEnvVars.filter(v => !process.env[v]?.trim());

  if (missing.length > 0) {
    console.error('\x1b[31mEnvironment Configuration Error:');
    console.error('The following required environment variables are missing or empty:');
    missing.forEach(v => console.error(`  - ${v}`));
    console.error('\nPlease check your .env file or environment export.\x1b[0m');
    return 1;
  }

  console.log('\x1b[32mEnvironment validation passed.\x1b[0m');
  return 0;
}

process.exit(main());