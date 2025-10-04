import React, { useState, useEffect } from 'react';
import './theme.css';
import './styles/ocean.css';
import './App.css';

import Navbar from './components/layout/Navbar';
import SidebarFilters from './components/layout/SidebarFilters';
import RecipesGrid from './components/recipes/RecipesGrid';
import RecipesList from './components/recipes/RecipesList';
import RecipeDetailModal from './components/recipes/RecipeDetailModal';

/**
 * Root App: Composes Navbar, SidebarFilters, list/grid content, and a detail modal.
 * - Uses Ocean Professional theme
 * - Accessible and responsive scaffold; no external deps
 */

// PUBLIC_INTERFACE
function App() {
  /** Root theme state (light/dark). Provided for future expansion and accessibility. */
  const [theme, setTheme] = useState('light');

  // Placeholder view state: 'grid' or 'list'
  const [viewMode, setViewMode] = useState('grid');

  // Placeholder items for UI scaffolding
  const [items] = useState([
    {
      id: 1,
      title: 'Creamy Tomato Pasta',
      time: 25,
      rating: 4.3,
      image: 'https://images.unsplash.com/photo-1523986371872-9d3ba2e2a389?q=80&w=1200&auto=format&fit=crop',
      ingredients: ['Pasta', 'Tomatoes', 'Cream', 'Garlic', 'Basil'],
      steps: ['Boil pasta', 'Cook sauce', 'Combine and serve'],
    },
    {
      id: 2,
      title: 'Avocado Toast Deluxe',
      time: 10,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=1200&auto=format&fit=crop',
      ingredients: ['Bread', 'Avocado', 'Lemon', 'Chili flakes'],
      steps: ['Toast bread', 'Mash avocado', 'Assemble'],
    },
    {
      id: 3,
      title: 'Hearty Veggie Soup',
      time: 40,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1200&auto=format&fit=crop',
      ingredients: ['Carrots', 'Celery', 'Onion', 'Broth', 'Noodles'],
      steps: ['Chop veggies', 'Simmer broth', 'Add noodles'],
    },
  ]);

  // Selected recipe for the detail modal
  const [selected, setSelected] = useState(null);

  // Effect to apply theme to document element for global theming hooks
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Handlers (placeholders)
  const handleSearchChange = (q) => {
    // Placeholder for search handling
    // console.log('Search query:', q);
  };

  const handleFilterChange = (filters) => {
    // Placeholder for filter handling
    // console.log('Filters updated:', filters);
  };

  const rightActions = (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
    </button>
  );

  return (
    <div className="App app-layout">
      <Navbar onSearchChange={handleSearchChange} rightActions={rightActions} />

      <SidebarFilters onFilterChange={handleFilterChange} />

      <main className="main">
        <div className="container">
          {/* Toolbar: view toggle and results info */}
          <div
            className="section"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 20,
            }}
          >
            <div>
              <h2 style={{ margin: 0 }}>Discover Recipes</h2>
              <p className="text-muted" style={{ margin: 0, fontSize: 14 }}>
                Browse delicious meals curated for you.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                className="btn ghost"
                aria-pressed={viewMode === 'grid'}
                onClick={() => setViewMode('grid')}
                aria-label="Grid view"
                title="Grid view"
              >
                ⬛⬛
              </button>
              <button
                className="btn ghost"
                aria-pressed={viewMode === 'list'}
                onClick={() => setViewMode('list')}
                aria-label="List view"
                title="List view"
              >
                ☰
              </button>
            </div>
          </div>

          {/* Content list */}
          {viewMode === 'grid' ? (
            <RecipesGrid items={items} onSelect={setSelected} />
          ) : (
            <RecipesList items={items} onSelect={setSelected} />
          )}
        </div>
      </main>

      {/* Modal container */}
      <RecipeDetailModal open={!!selected} recipe={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

export default App;
