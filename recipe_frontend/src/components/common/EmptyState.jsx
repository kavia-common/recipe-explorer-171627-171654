import React from 'react';
import Spinner from './Spinner';

/**
 * EmptyState: Displays a friendly empty state or loading state.
 */

// PUBLIC_INTERFACE
export default function EmptyState({ title = 'No results', description, loading = false }) {
  if (loading) {
    const descId = 'empty-loading-desc';
    return (
      <div className="card" style={{ textAlign: 'center' }} aria-busy="true">
        <Spinner aria-describedby={descId} label="Loading recipes" />
        <p id={descId} style={{ marginTop: 12 }} className="text-muted">
          Fetching recipes...
        </p>
      </div>
    );
  }

  const headingId = 'empty-state-title';
  const descId = description ? 'empty-state-desc' : undefined;

  return (
    <div
      className="card"
      style={{ textAlign: 'center' }}
      role="status"
      aria-live="polite"
      aria-labelledby={headingId}
      aria-describedby={descId}
    >
      <div style={{ fontSize: 32, marginBottom: 8 }} aria-hidden="true">🍽️</div>
      <h3 id={headingId} style={{ marginBottom: 8 }}>{title}</h3>
      {description && <p id={descId} className="text-muted">{description}</p>}
    </div>
  );
}
