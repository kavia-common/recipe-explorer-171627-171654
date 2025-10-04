import React, { createContext, useContext, useMemo, useReducer } from 'react';

/**
 * Recipes State store using React Context + Reducer.
 * Manages: items, loading, error, selectedRecipe.
 * Includes mock data for visualization until API stubs are wired.
 */

const RecipesStateContext = createContext(undefined);
const RecipesDispatchContext = createContext(undefined);

// Mock items for initial visualization
const mockItems = [
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
];

const initialRecipesState = {
  items: mockItems,
  loading: false,
  error: null,
  selectedRecipe: null,
};

const types = {
  SET_ITEMS: 'SET_ITEMS',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SELECT_RECIPE: 'SELECT_RECIPE',
  RESET_SELECTION: 'RESET_SELECTION',
};

function recipesReducer(state, action) {
  switch (action.type) {
    case types.SET_ITEMS:
      return { ...state, items: Array.isArray(action.payload) ? action.payload : [], loading: false, error: null };
    case types.SET_LOADING:
      return { ...state, loading: !!action.payload };
    case types.SET_ERROR:
      return { ...state, error: action.payload ?? 'Unknown error', loading: false };
    case types.SELECT_RECIPE:
      return { ...state, selectedRecipe: action.payload || null };
    case types.RESET_SELECTION:
      return { ...state, selectedRecipe: null };
    default:
      return state;
  }
}

// PUBLIC_INTERFACE
export function RecipesProvider({ children }) {
  /** Provider for recipes list, loading, error, and current selection. */
  const [state, dispatch] = useReducer(recipesReducer, initialRecipesState);

  const actions = useMemo(() => {
    return {
      // PUBLIC_INTERFACE
      setItems: (items) => dispatch({ type: types.SET_ITEMS, payload: items }),

      // PUBLIC_INTERFACE
      setLoading: (flag) => dispatch({ type: types.SET_LOADING, payload: flag }),

      // PUBLIC_INTERFACE
      setError: (err) => dispatch({ type: types.SET_ERROR, payload: err }),

      // PUBLIC_INTERFACE
      selectRecipe: (recipe) => dispatch({ type: types.SELECT_RECIPE, payload: recipe }),

      // PUBLIC_INTERFACE
      resetSelection: () => dispatch({ type: types.RESET_SELECTION }),
    };
  }, []);

  return (
    <RecipesStateContext.Provider value={state}>
      <RecipesDispatchContext.Provider value={actions}>{children}</RecipesDispatchContext.Provider>
    </RecipesStateContext.Provider>
  );
}

// PUBLIC_INTERFACE
export function useRecipes() {
  /** Hook to access recipes state and actions. */
  const state = useContext(RecipesStateContext);
  const actions = useContext(RecipesDispatchContext);
  if (!state || !actions) {
    throw new Error('useRecipes must be used within a RecipesProvider');
  }
  return { state, actions };
}
