const VALID_API_BASE_URL = "https://api.exchangeratesapi.io";
const VALID_API_KEY = "test_key_123";

export const TEST_DATA = {
  VALID_API_BASE_URL,
  VALID_API_KEY,
  DEFAULT_EXCHANGE_RATES_URL:
    `${VALID_API_BASE_URL}/v1/latest?access_key=${VALID_API_KEY}`,
} as const;