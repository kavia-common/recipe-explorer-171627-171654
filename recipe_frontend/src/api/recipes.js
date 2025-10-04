import { apiRequest } from './client';
import { isMockEnabled } from '../config';

// Shared mock dataset
const mockRecipes = [
  {
    id: 1,
    title: 'Creamy Tomato Pasta',
    time: 25,
    rating: 4.3,
    cuisine: 'Italian',
    tags: ['quick', 'pasta'],
    image: 'https://images.unsplash.com/photo-1523986371872-9d3ba2e2a389?q=80&w=1200&auto=format&fit=crop',
    ingredients: ['Pasta', 'Tomatoes', 'Cream', 'Garlic', 'Basil'],
    steps: ['Boil pasta', 'Cook sauce', 'Combine and serve'],
  },
  {
    id: 2,
    title: 'Avocado Toast Deluxe',
    time: 10,
    rating: 4.8,
    cuisine: 'American',
    tags: ['breakfast', 'quick'],
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=1200&auto=format&fit=crop',
    ingredients: ['Bread', 'Avocado', 'Lemon', 'Chili flakes'],
    steps: ['Toast bread', 'Mash avocado', 'Assemble'],
  },
  {
    id: 3,
    title: 'Hearty Veggie Soup',
    time: 40,
    rating: 4.5,
    cuisine: 'Mediterranean',
    tags: ['soup', 'comfort'],
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1200&auto=format&fit=crop',
    ingredients: ['Carrots', 'Celery', 'Onion', 'Broth', 'Noodles'],
    steps: ['Chop veggies', 'Simmer broth', 'Add noodles'],
  },
];

// Simulate latency in mock mode
function delay(ms = 300) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// PUBLIC_INTERFACE
export async function listRecipes(params = {}) {
  /**
   * Fetch a list of recipes.
   * params: { search, tags, cuisine, time, difficulty, rating, page, pageSize }
   * Returns: Array of recipe summaries.
   */
  if (isMockEnabled()) {
    await delay(200);
    const q = (params.search || '').toLowerCase().trim();
    let items = [...mockRecipes];

    if (q) {
      items = items.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          (r.ingredients || []).some((i) => i.toLowerCase().includes(q))
      );
    }
    return items;
  }

  const { data } = await apiRequest('/recipes', { query: params });
  // Expecting the API to return { items: [...] } or an array. Normalize to array.
  return Array.isArray(data) ? data : Array.isArray(data?.items) ? data.items : [];
}

// PUBLIC_INTERFACE
export async function getRecipe(id) {
  /**
   * Fetch a specific recipe by ID.
   * Returns: Recipe object.
   */
  if (!id) throw new Error('id is required');
  if (isMockEnabled()) {
    await delay(150);
    return mockRecipes.find((r) => String(r.id) === String(id)) || null;
  }

  const { data } = await apiRequest(`/recipes/${encodeURIComponent(id)}`);
  return data;
}

// PUBLIC_INTERFACE
export async function saveRecipe(recipe) {
  /**
   * Create or update a recipe.
   * - If recipe.id exists, performs update; else creates new.
   * Returns: Saved recipe object from backend or mock persisted object.
   */
  if (!recipe || typeof recipe !== 'object') throw new Error('recipe is required');
  if (isMockEnabled()) {
    await delay(200);
    if (recipe.id) {
      // Update in mock list if exists
      const idx = mockRecipes.findIndex((r) => String(r.id) === String(recipe.id));
      if (idx >= 0) {
        mockRecipes[idx] = { ...mockRecipes[idx], ...recipe };
        return mockRecipes[idx];
      }
      // If not found, append
      mockRecipes.push({ ...recipe });
      return recipe;
    } else {
      // Create new with incremental id
      const nextId = Math.max(...mockRecipes.map((r) => r.id)) + 1;
      const created = { ...recipe, id: nextId };
      mockRecipes.push(created);
      return created;
    }
  }

  if (recipe.id) {
    const { data } = await apiRequest(`/recipes/${encodeURIComponent(recipe.id)}`, {
      method: 'PUT',
      body: recipe,
    });
    return data;
  } else {
    const { data } = await apiRequest('/recipes', {
      method: 'POST',
      body: recipe,
    });
    return data;
  }
}

// PUBLIC_INTERFACE
export async function listTags() {
  /**
   * Fetch available tags taxonomy for filtering.
   * Returns: Array<string>
   */
  if (isMockEnabled()) {
    await delay(80);
    const set = new Set();
    mockRecipes.forEach((r) => (r.tags || []).forEach((t) => set.add(t)));
    return Array.from(set);
  }
  const { data } = await apiRequest('/tags');
  return Array.isArray(data) ? data : [];
}

// PUBLIC_INTERFACE
export async function listCuisines() {
  /**
   * Fetch available cuisines taxonomy for filtering.
   * Returns: Array<string>
   */
  if (isMockEnabled()) {
    await delay(80);
    const set = new Set();
    mockRecipes.forEach((r) => set.add(r.cuisine || ''));
    return Array.from(set).filter(Boolean);
  }
  const { data } = await apiRequest('/cuisines');
  return Array.isArray(data) ? data : [];
}
