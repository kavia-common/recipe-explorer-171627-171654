# Recipe Explorer Frontend

This React application provides a clean, modern interface for browsing, searching, and managing recipes. It uses a lightweight stack with vanilla CSS, a small state store, and a minimal API layer that can operate in mock mode or connect to a real backend via REST.

## Quick Start

You can run the frontend with or without a backend. The app includes a safe mock mode so development is never blocked.

- Run in development (mock mode by default if no backend configured):
  1) npm install
  2) npm start
  3) Visit http://localhost:3000
- Run against a real backend:
  1) Create a .env file in this folder (see .env.example if present) and set:
     REACT_APP_API_BASE_URL=https://your-backend.example.com
  2) npm start
  3) Mock mode will be off unless you explicitly force it on.

Build and test commands:
- npm test — launches the test runner
- npm run build — builds the production bundle in build/

## Environment Configuration

This project reads Create React App style environment variables and provides safe defaults.

Required/optional variables:
- REACT_APP_API_BASE_URL
  - Where: put this in recipe_frontend/.env
  - Purpose: base URL of your backend API (e.g., https://api.example.com or http://localhost:4000).
  - Default behavior: if not set, mock mode is automatically enabled.
  - Default code fallback: http://localhost:4000 (src/config.js).
- REACT_APP_API_MOCK
  - Where: put this in recipe_frontend/.env
  - Purpose: optional override; set to "true" to force mock mode even when a base URL is provided.
  - Any value other than the string "true" is ignored.

Example .env:
REACT_APP_API_BASE_URL=https://api.example.com
# Force mock mode regardless of base URL (optional)
# REACT_APP_API_MOCK=true

Tip: If a .env.example file exists, copy it to .env and adjust values. If not, use the snippet above to create one.

Where configuration is applied:
- src/config.js — parses REACT_APP_API_BASE_URL and REACT_APP_API_MOCK and exports:
  - apiBaseUrl: string
  - isMockMode: boolean (true if REACT_APP_API_MOCK === "true" OR REACT_APP_API_BASE_URL is not set)
  - isDev: boolean based on NODE_ENV

## Mock Mode Behavior

Mock mode keeps the UI usable even if a backend is unavailable. When enabled, API calls in src/api/recipes.js return deterministic in-app data and simulate small delays to mirror real network behavior. In development with mock mode on, DevBanner (src/components/common/DevBanner.jsx) displays a small, non-intrusive banner in the top-right corner to indicate that responses are mocked. The banner auto-dismisses after a few seconds and can be manually dismissed.

How mock mode is determined:
- ON when REACT_APP_API_MOCK === "true" OR when REACT_APP_API_BASE_URL is not set.
- OFF when REACT_APP_API_BASE_URL is set and REACT_APP_API_MOCK is not "true".

## API Endpoints and Payloads

The API client is in src/api/client.js and reads the base URL from src/config.js. Recipes-specific calls live in src/api/recipes.js. In real mode, the following endpoints are called:

- GET /recipes with query params
  - Query parameters (all optional): search, tags, cuisine, time, difficulty, rating, page, pageSize.
  - Expected response (either is acceptable; the client normalizes to an array):
    1) Array form:
       [
         {
           "id": 1,
           "title": "Creamy Tomato Pasta",
           "time": 25,
           "rating": 4.3,
           "cuisine": "Italian",
           "tags": ["quick","pasta"],
           "image": "https://...",
           "ingredients": ["Pasta","Tomatoes","Cream","Garlic","Basil"],
           "steps": ["Boil pasta","Cook sauce","Combine and serve"]
         }
       ]
    2) Object form:
       {
         "items": [ { ...same as above... } ],
         "page": 1,
         "pageSize": 20,
         "total": 100
       }

- GET /recipes/:id
  - Path parameter: :id (string or number)
  - Expected response: a single recipe object:
    {
      "id": 2,
      "title": "Avocado Toast Deluxe",
      "time": 10,
      "rating": 4.8,
      "cuisine": "American",
      "tags": ["breakfast","quick"],
      "image": "https://...",
      "ingredients": ["Bread","Avocado","Lemon","Chili flakes"],
      "steps": ["Toast bread","Mash avocado","Assemble"]
    }

- POST /recipes/:id/save (mock-only convenience; real backend should provide explicit create/update endpoints)
  - Note: In real mode, the code does not call this endpoint; see saveRecipe below for real-mode behavior.
  - In mock mode, saveRecipe mutates in-memory data and returns the saved object.

- POST /recipes (create) and PUT /recipes/:id (update)
  - These are called by saveRecipe in real mode:
    - Create (no id): POST /recipes with body containing the recipe fields
    - Update (with id): PUT /recipes/:id with body containing the updated recipe fields
  - Expected response: the saved recipe object returned from the backend

- GET /tags
  - Expected response:
    ["quick","pasta","breakfast","comfort"]

- GET /cuisines
  - Expected response:
    ["Italian","American","Mediterranean"]

Notes:
- The client adds query parameters only when values are present and supports arrays by appending multiple values with the same key.
- Responses should use application/json content type. Non-2xx responses will throw an Error with status and details.

## Project Structure

The key folders for extending the app are:

- src/components — UI components for layout, recipes, and small primitives
  - layout/Navbar.jsx — top navigation with search
  - layout/SidebarFilters.jsx — collapsible filters panel
  - recipes/* — RecipeCard, RecipesGrid, RecipesList, RecipeDetailModal
  - common/* — DevBanner, Spinner, Badge, a11y helpers
- src/store — lightweight state containers
  - uiState.js — search, filters, view mode, and modal state with debounced search
  - recipesState.js — recipes list, loading/error state, and selected recipe
- src/api — small API layer
  - client.js — base fetch wrapper including base URL and query serialization
  - recipes.js — listRecipes, getRecipe, saveRecipe, listTags, listCuisines
- src/styles — Ocean Professional theme styles
  - ocean.css — primary CSS including layout scaffolding and components
- src/assets — local assets (images and icons)
- src/config.js — environment parsing and feature flags (apiBaseUrl, isMockMode, isDev)

To adjust the API base URL or mock behavior, edit recipe_frontend/.env or update src/config.js if you need different defaults.

## Styling (Ocean Professional theme) and a11y notes

The UI follows a modern Ocean Professional theme: blue primary and amber secondary accents, rounded corners, subtle shadows, and minimalist surfaces. Theme tokens are defined in src/theme.css and applied in src/styles/ocean.css. Components rely on semantic HTML and ARIA attributes for accessibility. For example, the modal dialog sets role="dialog" with aria-modal and labeled/ described elements; keyboard interaction includes ESC to close and focus trapping. The Navbar search uses role="search" and accessible labels, while list and grid toggles indicate pressed state. See src/components/common/README-a11y.md for additional patterns and tips.

## Running With and Without a Backend

- Without backend (mock mode):
  - Leave REACT_APP_API_BASE_URL unset, or set REACT_APP_API_MOCK=true in .env.
  - Start with npm start.
  - In development, DevBanner appears briefly to indicate that mock mode is active.

- With backend:
  - Set REACT_APP_API_BASE_URL in .env to your API host, e.g.:
    REACT_APP_API_BASE_URL=http://localhost:4000
  - Ensure your backend implements the endpoints listed above.
  - Start with npm start and the app will call the backend instead of mocks.

## Next Steps for Backend Integration

When your backend is ready, remove or phase out mock mode by providing a valid REACT_APP_API_BASE_URL and ensuring your endpoints conform to the expected shapes above. For create/update, the frontend issues POST /recipes and PUT /recipes/:id in real mode; implement those routes server-side and return the saved recipe object. You can safely leave mock mode logic in place during development and disable it per environment using .env. Once the backend is stable, you may optionally remove mock branches from src/api/recipes.js to simplify the code path.

For deeper API details, see README-API.md in this folder, which summarizes the API layer and setup instructions.
