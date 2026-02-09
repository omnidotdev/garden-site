/**
 * Environment variables.
 */
export const {
  // feature flags
  VITE_FLAGS_API_HOST: FLAGS_API_HOST,
  VITE_FLAGS_CLIENT_KEY: FLAGS_CLIENT_KEY,
} = {
  ...import.meta.env,
  ...process.env,
};
