export class APIConstants {

  static readonly currencies = {
    EUR: {
      code: "EUR",
      name: "Euro"
    },
    USD: {
      code: "USD",
      name: "United States Dollar"
    }
  } as const;

  static readonly ExchangeRateErrors = {
    INTERNAL_ERROR: {
      code: 500,
      type: "internal_server_error",
      info: "An internal error occurred while processing your request."
    },
    INVALID_KEY: {
      code: 101,
      type: "invalid_access_key",
      info: "You have not supplied a valid API Access Key."
    },
    MISSING_KEY: {
      code: 201,
      type: "missing_access_key",
      info: "You have not supplied an API Access Key."
    }
  } as const;
}