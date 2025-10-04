import React from 'react';
import RecipeCard from './RecipeCard';
import EmptyState from '../common/EmptyState';

/**
 * RecipesList: displays a vertical list of RecipeCard components (single-column).
 */

// PUBLIC_INTERFACE
export default function RecipesList({ items = [], onSelect }) {
  if (!items || items.length === 0) {
    return <EmptyState title="No recipes found" description="Try a different search." />;
  }

  return (
    <div className="grid cols-1" style={{ display: 'grid', gap: '20px' }}>
      {items.map((item) => (
        <RecipeCard key={item.id || item.title} item={item} onSelect={onSelect} />
      ))}
    </div>
  );
}
