# API integration notes

This frontend includes a small API layer with mock fallback:

- src/config.js
  - Reads REACT_APP_API_BASE_URL (defaults to http://localhost:4000)
  - Auto-enables mock mode when REACT_APP_API_BASE_URL is not set
  - REACT_APP_API_MOCK=true can force mock mode

- src/api/client.js
  - Minimal fetch wrapper with base URL, query serialization, JSON handling

- src/api/recipes.js
  - listRecipes(params)
  - getRecipe(id)
  - saveRecipe(recipe)
  - listTags(), listCuisines()
  - All support mock mode

- src/store/recipesState.js
  - Auto-loads recipes via listRecipes on mount
  - Keeps UI responsive even if backend is unavailable (mock data remains)

Setup:
- Copy .env.example to .env and adjust REACT_APP_API_BASE_URL to point to your backend to disable auto-mock mode.
- Alternatively, set REACT_APP_API_MOCK=true to force mock mode regardless of base URL.
