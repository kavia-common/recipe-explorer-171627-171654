# Accessibility helpers and usage

This folder contains small primitives to improve app-wide accessibility:

- SrOnly.jsx
  - Screen-reader-only wrapper for content you don't want visually visible.
  - Usage: <SrOnly>Additional context</SrOnly>

Patterns used app-wide:
- Spinner provides role="status", aria-live="polite", and aria-busy for loading.
- EmptyState supports loading and non-loading states with proper aria-labelledby/aria-describedby.
- RecipeDetailModal implements:
  - role="dialog" with aria-modal, labelledby, and describedby
  - Focus trapping within the dialog
  - Escape to close and click outside to close
  - Returning focus to the trigger after closing
- Navbar search input is labelled and wrapped in role="search".
- View toggles declare role="group" and aria-pressed state.

Developers: when adding new interactive controls, ensure:
- Clear aria-label or a visible label
- Keyboard operability (Tab/Shift+Tab, Enter/Space)
- Focus management for overlays and popovers
- No reliance on color alone to convey meaning
