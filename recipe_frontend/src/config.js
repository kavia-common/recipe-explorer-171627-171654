 /**
  * Configuration module for API settings and feature flags.
  * Reads environment variables (Create React App format) and provides safe defaults.
  * No external dependencies.
  */

 // Normalize environment variables from CRA
 const RAW_BASE_URL = process.env.REACT_APP_API_BASE_URL;
 const RAW_FORCE_MOCK = process.env.REACT_APP_API_MOCK;

 // PUBLIC_INTERFACE
 export const apiBaseUrl = RAW_BASE_URL || 'http://localhost:4000';

 // PUBLIC_INTERFACE
 export const isMockMode = (RAW_FORCE_MOCK === 'true') || !RAW_BASE_URL;

 // PUBLIC_INTERFACE
 export const isDev = process.env.NODE_ENV !== 'production';

 // PUBLIC_INTERFACE
 export const config = {
   /** Base URL for backend API. Falls back to localhost if not provided. */
   apiBaseUrl,
   /**
    * When true, API stubs will return mock data instead of making network requests.
    * Enabled automatically if REACT_APP_API_BASE_URL is not set or REACT_APP_API_MOCK==='true'.
    */
   mock: isMockMode,
   /** Whether current build is development mode. */
   isDev,
 };

 // PUBLIC_INTERFACE
 export function getApiBaseUrl() {
   /** Returns the configured API base URL string. */
   return apiBaseUrl;
 }

 // PUBLIC_INTERFACE
 export function isMockEnabled() {
   /** Returns whether mock mode is enabled. */
   return !!isMockMode;
 }
