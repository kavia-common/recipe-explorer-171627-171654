import React, { useEffect, useRef } from 'react';
import Badge from '../common/Badge';

/**
 * RecipeDetailModal: shows recipe details in a modal.
 * - Closes on Esc
 * - Focus management placeholder (focus trap to be added in later step)
 */

// PUBLIC_INTERFACE
export default function RecipeDetailModal({ open, recipe, onClose }) {
  const closeBtnRef = useRef(null);

  // Close on escape key
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape' && open) onClose && onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  // Simple initial focus management
  useEffect(() => {
    if (open && closeBtnRef.current) {
      closeBtnRef.current.focus();
    }
  }, [open]);

  if (!open || !recipe) return null;

  const { title, image, time = 0, rating = 0, ingredients = [], steps = [] } = recipe;

  return (
    <div
      className={`modal-backdrop ${open ? 'open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="recipe-modal-title"
      onClick={(e) => {
        // click outside to close
        if (e.target === e.currentTarget) onClose && onClose();
      }}
    >
      <div className="modal" role="document">
        <header className="modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 id="recipe-modal-title" style={{ margin: 0 }}>{title}</h2>
          <button ref={closeBtnRef} className="btn ghost" onClick={onClose} aria-label="Close recipe details">
            Close
          </button>
        </header>

        <div className="modal-body">
          <div style={{ position: 'relative', borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: 16 }}>
            {image ? (
              <img src={image} alt={title} style={{ width: '100%', display: 'block' }} />
            ) : (
              <div
                aria-hidden="true"
                style={{
                  width: '100%',
                  aspectRatio: '16/9',
                  display: 'grid',
                  placeItems: 'center',
                  background: '#eef2ff',
                  color: 'var(--color-muted)',
                  fontSize: 36,
                }}
              >
                🍽️
              </div>
            )}
            <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', gap: 8 }}>
              <Badge variant="secondary">⏱ {time} min</Badge>
              <Badge>★ {rating}</Badge>
            </div>
          </div>

          <section style={{ marginBottom: 16 }}>
            <h3>Ingredients</h3>
            <ul>
              {ingredients.length > 0 ? (
                ingredients.map((it, idx) => <li key={idx}>{it}</li>)
              ) : (
                <li className="text-muted">No ingredients listed.</li>
              )}
            </ul>
          </section>

          <section>
            <h3>Steps</h3>
            <ol>
              {steps.length > 0 ? (
                steps.map((st, idx) => <li key={idx} style={{ marginBottom: 8 }}>{st}</li>)
              ) : (
                <li className="text-muted">No steps provided.</li>
              )}
            </ol>
          </section>
        </div>

        <footer className="modal-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="text-muted" style={{ fontSize: 12 }}>Actions</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn ghost" aria-label="Save recipe">Save</button>
            <button className="btn ghost" aria-label="Share recipe">Share</button>
          </div>
        </footer>

        {/* Focus trap placeholder: In a later step, implement roving tabindex or trap focus inside modal */}
      </div>
    </div>
  );
}
