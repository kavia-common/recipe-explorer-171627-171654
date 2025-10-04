import React, { useState } from 'react';

/**
 * SidebarFilters: Collapsible filter sidebar with common recipe filters.
 * Emits onFilterChange with a filter object; manages local state; no external deps.
 */

const initialFilters = {
  cuisine: '',
  diet: '',
  time: '',
  difficulty: '',
  rating: '',
  tags: '',
};

// PUBLIC_INTERFACE
export default function SidebarFilters({ onFilterChange }) {
  const [open, setOpen] = useState(true);
  const [filters, setFilters] = useState(initialFilters);

  const handleToggle = () => setOpen(!open);

  const updateFilter = (key, value) => {
    const next = { ...filters, [key]: value };
    setFilters(next);
    if (onFilterChange) onFilterChange(next);
  };

  return (
    <aside className="sidebar" aria-label="Filters">
      <div className="section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0 }}>Filters</h3>
          <button
            className="btn ghost"
            onClick={handleToggle}
            aria-expanded={open}
            aria-controls="filters-panel"
          >
            {open ? 'Hide' : 'Show'}
          </button>
        </div>

        <div
          id="filters-panel"
          style={{ marginTop: '16px', display: open ? 'block' : 'none' }}
          role="region"
          aria-label="Filter options"
        >
          {/* Cuisine */}
          <div style={{ marginBottom: 16 }}>
            <label htmlFor="f-cuisine">Cuisine</label>
            <select
              id="f-cuisine"
              className="input"
              value={filters.cuisine}
              onChange={(e) => updateFilter('cuisine', e.target.value)}
            >
              <option value="">Any</option>
              <option>Italian</option>
              <option>Mexican</option>
              <option>Indian</option>
              <option>Chinese</option>
              <option>Mediterranean</option>
            </select>
          </div>

          {/* Diet */}
          <div style={{ marginBottom: 16 }}>
            <label htmlFor="f-diet">Diet</label>
            <select
              id="f-diet"
              className="input"
              value={filters.diet}
              onChange={(e) => updateFilter('diet', e.target.value)}
            >
              <option value="">Any</option>
              <option>Vegetarian</option>
              <option>Vegan</option>
              <option>Gluten-Free</option>
              <option>Keto</option>
              <option>Paleo</option>
            </select>
          </div>

          {/* Time */}
          <div style={{ marginBottom: 16 }}>
            <label htmlFor="f-time">Time</label>
            <select
              id="f-time"
              className="input"
              value={filters.time}
              onChange={(e) => updateFilter('time', e.target.value)}
            >
              <option value="">Any</option>
              <option value="15">Under 15 min</option>
              <option value="30">Under 30 min</option>
              <option value="60">Under 60 min</option>
              <option value="120">Over 60 min</option>
            </select>
          </div>

          {/* Difficulty */}
          <div style={{ marginBottom: 16 }}>
            <label htmlFor="f-difficulty">Difficulty</label>
            <select
              id="f-difficulty"
              className="input"
              value={filters.difficulty}
              onChange={(e) => updateFilter('difficulty', e.target.value)}
            >
              <option value="">Any</option>
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>

          {/* Rating */}
          <div style={{ marginBottom: 16 }}>
            <label htmlFor="f-rating">Rating</label>
            <select
              id="f-rating"
              className="input"
              value={filters.rating}
              onChange={(e) => updateFilter('rating', e.target.value)}
            >
              <option value="">Any</option>
              <option value="4">4+ stars</option>
              <option value="4.5">4.5+ stars</option>
              <option value="5">5 stars</option>
            </select>
          </div>

          {/* Tags */}
          <div style={{ marginBottom: 8 }}>
            <label htmlFor="f-tags">Tags</label>
            <input
              id="f-tags"
              type="text"
              className="input"
              placeholder="e.g., quick, spicy"
              value={filters.tags}
              onChange={(e) => updateFilter('tags', e.target.value)}
            />
            <p className="text-muted" style={{ fontSize: '12px', marginTop: 6 }}>
              Separate multiple tags with commas.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            <button
              className="btn ghost"
              onClick={() => {
                setFilters(initialFilters);
                if (onFilterChange) onFilterChange(initialFilters);
              }}
            >
              Reset
            </button>
            <button className="btn" onClick={() => onFilterChange && onFilterChange(filters)}>
              Apply
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
