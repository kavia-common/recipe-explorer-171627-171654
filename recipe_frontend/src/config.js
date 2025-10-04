//
// Configuration module for API settings and feature flags.
// Reads environment variables (Create React App format) and provides safe defaults.
// No external dependencies.
//

// PUBLIC_INTERFACE
export const config = {
  /** Base URL for backend API. Falls back to localhost if not provided. */
  apiBaseUrl: process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000',
  /**
   * When true, API stubs will return mock data instead of making network requests.
   * Enabled automatically if REACT_APP_API_BASE_URL is not set.
   */
  mock: (process.env.REACT_APP_API_MOCK === 'true') || !process.env.REACT_APP_API_BASE_URL,
};

// PUBLIC_INTERFACE
export function getApiBaseUrl() {
  /** Returns the configured API base URL string. */
  return config.apiBaseUrl;
}

// PUBLIC_INTERFACE
export function isMockEnabled() {
  /** Returns whether mock mode is enabled. */
  return !!config.mock;
}
