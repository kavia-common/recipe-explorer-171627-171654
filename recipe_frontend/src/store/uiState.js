import React, { createContext, useContext, useMemo, useReducer, useRef, useEffect, useCallback, useState } from 'react';

/**
 * UI State store using React Context + Reducer.
 * Manages: searchQuery, filters, viewMode, modal open state, and selectedRecipeId.
 * Exposes debounced setSearchQuery for smoother UX.
 */

const UIStateContext = createContext(undefined);
const UIDispatchContext = createContext(undefined);

// Initial UI state
const initialUIState = {
  searchQuery: '',
  filters: {
    cuisine: '',
    diet: '',
    time: '',
    difficulty: '',
    rating: '',
    tags: '',
  },
  viewMode: 'grid', // 'grid' | 'list'
  isModalOpen: false,
  selectedRecipeId: null,
};

// Action types
const types = {
  SET_SEARCH_QUERY: 'SET_SEARCH_QUERY',
  SET_FILTERS: 'SET_FILTERS',
  SET_VIEW_MODE: 'SET_VIEW_MODE',
  OPEN_MODAL: 'OPEN_MODAL',
  CLOSE_MODAL: 'CLOSE_MODAL',
  RESET_SELECTION: 'RESET_SELECTION',
};

// Reducer handling state transitions
function uiReducer(state, action) {
  switch (action.type) {
    case types.SET_SEARCH_QUERY:
      return { ...state, searchQuery: action.payload || '' };
    case types.SET_FILTERS:
      return { ...state, filters: { ...state.filters, ...(action.payload || {}) } };
    case types.SET_VIEW_MODE:
      return { ...state, viewMode: action.payload === 'list' ? 'list' : 'grid' };
    case types.OPEN_MODAL:
      return { ...state, isModalOpen: true, selectedRecipeId: action.payload ?? state.selectedRecipeId };
    case types.CLOSE_MODAL:
      return { ...state, isModalOpen: false };
    case types.RESET_SELECTION:
      return { ...state, selectedRecipeId: null, isModalOpen: false };
    default:
      return state;
  }
}

// PUBLIC_INTERFACE
export function UIProvider({ children }) {
  /** Provider for UI state. Includes debounced search setter. */
  const [state, dispatch] = useReducer(uiReducer, initialUIState);

  // Simple debounced value management for search
  const [immediateSearch, setImmediateSearch] = useState(state.searchQuery);
  const debounceTimerRef = useRef(null);

  // When immediateSearch changes, debounce commit to state.searchQuery
  useEffect(() => {
    clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = setTimeout(() => {
      dispatch({ type: types.SET_SEARCH_QUERY, payload: immediateSearch });
    }, 300);
    return () => clearTimeout(debounceTimerRef.current);
  }, [immediateSearch]);

  // Action creators
  const actions = useMemo(() => {
    return {
      // PUBLIC_INTERFACE
      setSearchQueryDebounced: (q) => setImmediateSearch(q ?? ''),

      // PUBLIC_INTERFACE
      setFilters: (filters) => dispatch({ type: types.SET_FILTERS, payload: filters }),

      // PUBLIC_INTERFACE
      setViewMode: (mode) => dispatch({ type: types.SET_VIEW_MODE, payload: mode }),

      // PUBLIC_INTERFACE
      openModal: (id) => dispatch({ type: types.OPEN_MODAL, payload: id }),

      // PUBLIC_INTERFACE
      closeModal: () => dispatch({ type: types.CLOSE_MODAL }),

      // PUBLIC_INTERFACE
      resetSelection: () => dispatch({ type: types.RESET_SELECTION }),
    };
  }, []);

  const value = useMemo(
    () => ({
      ...state,
      // Expose immediateSearch for input value to avoid lag
      immediateSearch,
    }),
    [state, immediateSearch]
  );

  return (
    <UIStateContext.Provider value={value}>
      <UIDispatchContext.Provider value={actions}>{children}</UIDispatchContext.Provider>
    </UIStateContext.Provider>
  );
}

// PUBLIC_INTERFACE
export function useUI() {
  /** Hook to access UI state and actions. */
  const state = useContext(UIStateContext);
  const actions = useContext(UIDispatchContext);
  if (!state || !actions) {
    throw new Error('useUI must be used within a UIProvider');
    }
  return { state, actions };
}

// PUBLIC_INTERFACE
export function useDebouncedValue(value, delay = 300) {
  /**
   * Generic debounced value hook. Returns a value that updates after delay.
   */
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}
