import React, { useState, useEffect } from 'react';
import './theme.css';
import './styles/ocean.css';
import './App.css';

import Navbar from './components/layout/Navbar';
import SidebarFilters from './components/layout/SidebarFilters';
import RecipesGrid from './components/recipes/RecipesGrid';
import RecipesList from './components/recipes/RecipesList';
import RecipeDetailModal from './components/recipes/RecipeDetailModal';
import DevBanner from './components/common/DevBanner';

// State providers
import { UIProvider, useUI } from './store/uiState';
import { RecipesProvider, useRecipes } from './store/recipesState';

/**
 * Root App: Composes Navbar, SidebarFilters, list/grid content, and a detail modal.
 * - Uses Ocean Professional theme
 * - Accessible and responsive scaffold; no external deps
 */

// Internal component to consume contexts and render UI
function AppContent() {
  const [theme, setTheme] = useState('light');

  const {
    state: ui,
    actions: { setSearchQueryDebounced, setFilters, setViewMode, openModal, resetSelection, closeModal },
  } = useUI();

  const {
    state: recipes,
    actions: { selectRecipe, resetSelection: resetRecipeSelection },
  } = useRecipes();

  // Apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  // Handlers wired to contexts
  const handleSearchChange = (q) => {
    setSearchQueryDebounced(q);
  };
  const handleFilterChange = (filters) => {
    setFilters(filters);
  };

  // Select a recipe: set selected in recipes state and open modal in UI state
  const handleSelect = (item) => {
    selectRecipe(item);
    openModal(item?.id ?? null);
  };

  // Close modal: reset both UI selection and recipe selection
  const handleModalClose = () => {
    closeModal();
    resetSelection();
    resetRecipeSelection();
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

  // Simple client-side filter to visualize search impact on mock data
  const normalizedQuery = ui.searchQuery.trim().toLowerCase();
  const filteredItems = (recipes.items || []).filter((r) => {
    const matchQuery =
      !normalizedQuery ||
      r.title?.toLowerCase().includes(normalizedQuery) ||
      r.ingredients?.some((i) => i.toLowerCase().includes(normalizedQuery));
    // For now, just demonstrate filters existence; detailed filtering logic will be implemented later.
    return matchQuery;
  });

  return (
    <div className="App app-layout">
      <DevBanner />
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
            <div style={{ display: 'flex', gap: 8 }} role="group" aria-label="Toggle results layout">
              <button
                className="btn ghost"
                aria-pressed={ui.viewMode === 'grid'}
                onClick={() => setViewMode('grid')}
                aria-label="Grid view"
                title="Grid view"
              >
                ⬛⬛
              </button>
              <button
                className="btn ghost"
                aria-pressed={ui.viewMode === 'list'}
                onClick={() => setViewMode('list')}
                aria-label="List view"
                title="List view"
              >
                ☰
              </button>
            </div>
          </div>

          {/* Content list */}
          {ui.viewMode === 'grid' ? (
            <RecipesGrid items={filteredItems} onSelect={handleSelect} />
          ) : (
            <RecipesList items={filteredItems} onSelect={handleSelect} />
          )}
        </div>
      </main>

      {/* Modal container */}
      <RecipeDetailModal open={ui.isModalOpen && !!recipes.selectedRecipe} recipe={recipes.selectedRecipe} onClose={handleModalClose} />
    </div>
  );
}

// PUBLIC_INTERFACE
function App() {
  /** Entry component: wraps providers around AppContent. */
  return (
    <UIProvider>
      <RecipesProvider>
        <AppContent />
      </RecipesProvider>
    </UIProvider>
  );
}

export default App;
