import React from 'react';

/**
 * Spinner: simple animated spinner using CSS only.
 */

// PUBLIC_INTERFACE
export default function Spinner({ size = 20, label = 'Loading', 'aria-describedby': ariaDescribedBy }) {
  const style = {
    width: size,
    height: size,
    border: '3px solid rgba(37,99,235,0.15)',
    borderTopColor: 'var(--color-primary)',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  };

  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label={label}
      aria-describedby={ariaDescribedBy}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
    >
      <span style={style} aria-hidden="true" />
      <span className="visually-hidden">{label}</span>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
