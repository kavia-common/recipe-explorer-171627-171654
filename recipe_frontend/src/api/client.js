import { getApiBaseUrl } from '../config';

/**
 * Simple fetch wrapper with base URL, query support, and JSON handling.
 * No external dependencies. Designed for use across API modules.
 */

// Internal: build URL with query parameters
function buildUrl(path, query) {
  const base = getApiBaseUrl().replace(/\/+$/, '');
  const cleanPath = String(path || '').replace(/^\/+/, '');
  const url = new URL(`${base}/${cleanPath}`);
  if (query && typeof query === 'object') {
    Object.entries(query).forEach(([k, v]) => {
      if (v === undefined || v === null || v === '') return;
      if (Array.isArray(v)) {
        v.forEach((vv) => url.searchParams.append(k, vv));
      } else {
        url.searchParams.set(k, v);
      }
    });
  }
  return url.toString();
}

// PUBLIC_INTERFACE
export async function apiRequest(path, { method = 'GET', query, headers, body } = {}) {
  /**
   * Perform an HTTP request to the backend using the configured base URL.
   * - path: string endpoint path (e.g., '/recipes')
   * - method: HTTP method
   * - query: optional object to be serialized to query string
   * - headers: optional headers to include
   * - body: optional body; if object, will be JSON.stringified and content-type set
   *
   * Returns: { data, status, ok } or throws Error with { status, details } on non-2xx
   */
  const url = buildUrl(path, query);
  const opts = {
    method,
    headers: {
      Accept: 'application/json',
      ...(headers || {}),
    },
  };

  if (body !== undefined) {
    if (typeof body === 'object' && !(body instanceof FormData)) {
      opts.headers['Content-Type'] = 'application/json';
      opts.body = JSON.stringify(body);
    } else {
      opts.body = body;
    }
  }

  let resp;
  try {
    resp = await fetch(url, opts);
  } catch (e) {
    const err = new Error('Network error');
    err.cause = e;
    err.status = 0;
    throw err;
  }

  const contentType = resp.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');

  let payload = null;
  try {
    payload = isJson ? await resp.json() : await resp.text();
  } catch {
    // ignore parse errors; payload stays null
  }

  if (!resp.ok) {
    const err = new Error(`Request failed with status ${resp.status}`);
    err.status = resp.status;
    err.details = payload;
    throw err;
  }

  return { data: payload, status: resp.status, ok: true };
}
