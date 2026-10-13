export const config = {
  apiBaseUrl:
    import.meta.env.VITE_API_BASE_URL ??
    "http://127.0.0.1:5001/convertor-2b5dd/us-central1/api",
} as const;