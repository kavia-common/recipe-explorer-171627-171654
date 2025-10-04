import React, { useState, useEffect } from 'react';
import './theme.css';
import './styles/ocean.css';
import './App.css';
import logo from './assets/logo.svg';

// PUBLIC_INTERFACE
function App() {
  /** Root theme state (light/dark). Provided for future expansion and accessibility. */
  const [theme, setTheme] = useState('light');

  // Effect to apply theme to document element for global theming hooks
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="App app-layout">
      {/* Navbar placeholder */}
      <nav className="navbar u-shadow-sm">
        <div className="brand">
          <img src={logo} className="logo" alt="Recipe Explorer logo" />
          <span>Recipe Explorer</span>
        </div>
        <div className="actions">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </div>
      </nav>

      {/* Sidebar placeholder */}
      <aside className="sidebar">
        <div className="section u-gradient-primary">
          <h3>Filters</h3>
          <p className="placeholder">Sidebar content (search, filters) will go here.</p>
        </div>
      </aside>

      {/* Main content area */}
      <main className="main">
        <div className="container">
          <div className="section card">
            <h2>Welcome</h2>
            <p>
              Ocean Professional theme is active. Use this scaffold to build the Recipe Explorer UI
              with a responsive navbar, sidebar, and content area.
            </p>
          </div>

          <div className="grid cols-3" style={{ marginTop: '24px' }}>
            <div className="card">
              <h3>Quick Start</h3>
              <p className="placeholder">Add components for recipe list, cards, and details.</p>
            </div>
            <div className="card">
              <h3>Search & Filter</h3>
              <p className="placeholder">Hook sidebar inputs to state management.</p>
            </div>
            <div className="card">
              <h3>API Integration</h3>
              <p className="placeholder">Wire to backend stubs and handle .env gracefully.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
