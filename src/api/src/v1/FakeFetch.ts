export const MOCK_RATES_DATA = {
  success: true,
  base: "EUR",
  rates: { USD: 1.1, GBP: 0.85 }
};

export const fakeFetchSuccess: typeof fetch = async () => ({
  json: async () => MOCK_RATES_DATA
} as Response);

export const fakeFetchFailure: typeof fetch = async () => {
  throw new Error("Failed to fetch rates");
};