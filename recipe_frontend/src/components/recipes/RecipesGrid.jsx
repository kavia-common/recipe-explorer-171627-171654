import React from 'react';
import RecipeCard from './RecipeCard';
import EmptyState from '../common/EmptyState';

/**
 * RecipesGrid: displays a grid of RecipeCard components.
 */

// PUBLIC_INTERFACE
export default function RecipesGrid({ items = [], onSelect }) {
  if (!items || items.length === 0) {
    return <EmptyState title="No recipes found" description="Try adjusting your filters." />;
  }

  return (
    <div className="grid cols-3">
      {items.map((item) => (
        <RecipeCard key={item.id || item.title} item={item} onSelect={onSelect} />
      ))}
    </div>
  );
}
