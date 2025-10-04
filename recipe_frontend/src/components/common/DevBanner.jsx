import React, { useEffect, useState } from 'react';
import { isDev, isMockMode, apiBaseUrl } from '../../config';

/**
 * DevBanner: Non-intrusive developer-only banner/toast indicating Mock Mode is active.
 * - Uses Ocean theme tokens for subtle styling.
 * - Hooks are called unconditionally; render returns null when not applicable.
 */

// PUBLIC_INTERFACE
export default function DevBanner() {
  // Hooks must be called unconditionally
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 8000);
    return () => clearTimeout(t);
  }, []);

  // Render nothing if not dev or mock mode off, or dismissed
  if (!isDev || !isMockMode || !visible) return null;

  const containerStyle = {
    position: 'fixed',
    top: 12,
    right: 12,
    zIndex: 9999,
    display: 'flex',
    alignItems: 'start',
    gap: 10,
    padding: '10px 12px',
    background: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderLeft: '4px solid var(--color-secondary)',
    borderRadius: '10px',
    boxShadow: 'var(--shadow-md)',
    color: 'var(--color-text)',
    maxWidth: 360,
  };

  const pillStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    padding: '2px 8px',
    background: 'rgba(37, 99, 235, 0.08)',
    color: 'var(--color-primary)',
    borderRadius: '9999px',
    fontSize: 12,
    fontWeight: 700,
  };

  const closeBtn = {
    marginLeft: 'auto',
    background: 'transparent',
    border: 'none',
    color: 'var(--color-muted)',
    cursor: 'pointer',
    padding: 4,
    borderRadius: 6,
  };

  return (
    <aside
      role="status"
      aria-live="polite"
      aria-label="Mock mode banner"
      style={containerStyle}
    >
      <div style={{ fontSize: 18 }}>🧪</div>
      <div>
        <div style={pillStyle} title="Development build">
          DEV • Mock Mode
        </div>
        <div style={{ fontSize: 13, marginTop: 6 }} className="text-muted">
          API requests are being served by in-app mocks.
          {apiBaseUrl ? (
            <span> Base URL configured: <code>{apiBaseUrl}</code></span>
          ) : (
            <span> No REACT_APP_API_BASE_URL set; mocks auto-enabled.</span>
          )}
        </div>
      </div>
      <button
        style={closeBtn}
        aria-label="Dismiss mock mode banner"
        title="Dismiss"
        onClick={() => setVisible(false)}
      >
        ✕
      </button>
    </aside>
  );
}
