import React from 'react';
import Spinner from './Spinner';

/**
 * EmptyState: Displays a friendly empty state or loading state.
 */

// PUBLIC_INTERFACE
export default function EmptyState({ title = 'No results', description, loading = false }) {
  if (loading) {
    return (
      <div className="card" style={{ textAlign: 'center' }}>
        <Spinner />
        <p style={{ marginTop: 12 }} className="text-muted">
          Fetching recipes...
        </p>
      </div>
    );
  }

  return (
    <div className="card" style={{ textAlign: 'center' }}>
      <div style={{ fontSize: 32, marginBottom: 8 }}>🍽️</div>
      <h3 style={{ marginBottom: 8 }}>{title}</h3>
      {description && <p className="text-muted">{description}</p>}
    </div>
  );
}
