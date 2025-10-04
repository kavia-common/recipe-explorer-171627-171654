import React from 'react';

/**
 * Badge: pill badge with optional color variant.
 */

// PUBLIC_INTERFACE
export default function Badge({ children, variant = 'primary', title }) {
  const color =
    variant === 'secondary'
      ? 'var(--color-secondary)'
      : variant === 'success'
      ? 'var(--color-success)'
      : variant === 'error'
      ? 'var(--color-error)'
      : 'var(--color-primary)';

  const styles = {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '4px 8px',
    borderRadius: '9999px',
    fontSize: '12px',
    fontWeight: 700,
    color: '#fff',
    background: color,
    boxShadow: 'var(--shadow-xs)',
  };

  return (
    <span style={styles} title={title}>
      {children}
    </span>
  );
}
