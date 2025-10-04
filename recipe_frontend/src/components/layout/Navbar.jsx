import React from 'react';
import { useUI } from '../../store/uiState';

/**
 * Navbar: Top navigation header for the Recipe Explorer.
 * Provides brand/logo area, a search input, and slots for actions like theme toggle.
 */

// PUBLIC_INTERFACE
export default function Navbar({ onSearchChange, rightActions }) {
  const {
    state: { immediateSearch },
    actions: { setSearchQueryDebounced },
  } = useUI();

  const handleChange = (e) => {
    const val = e.target.value;
    // Update local debounced value in context
    setSearchQueryDebounced(val);
    // Also notify parent if provided (optional)
    if (onSearchChange) onSearchChange(val);
  };

  return (
    <header className="navbar u-shadow-sm" role="banner" aria-label="Top navigation">
      <div className="brand">
        {/* Placeholder inline SVG logo to avoid external assets dependency */}
        <svg
          className="logo"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            <linearGradient id="grad" x1="0" x2="1">
              <stop offset="0%" stopColor="#2563EB" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.95" />
            </linearGradient>
          </defs>
          <circle cx="12" cy="12" r="10" fill="url(#grad)" />
          <path d="M8 12h8M12 8v8" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
        <span>Recipe Explorer</span>
      </div>

      <div className="actions" role="search">
        <label htmlFor="recipe-search" className="visually-hidden">
          Search recipes
        </label>
        <input
          id="recipe-search"
          type="search"
          className="input"
          placeholder="Search recipes..."
          value={immediateSearch}
          onChange={handleChange}
          aria-label="Search recipes"
        />
        {/* Right side actions injected from parent (e.g., theme toggle button) */}
        {rightActions}
        <a className="btn ghost" href="#saved" aria-label="View saved recipes">
          Saved
        </a>
      </div>
    </header>
  );
}
