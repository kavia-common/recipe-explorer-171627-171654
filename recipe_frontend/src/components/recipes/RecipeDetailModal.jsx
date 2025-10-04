import React, { useEffect, useRef } from 'react';
import Badge from '../common/Badge';

/**
 * RecipeDetailModal: Accessible modal dialog for viewing recipe details.
 * - ARIA: role="dialog", aria-modal, labelledby/ describedby
 * - Focus: traps focus within modal, returns focus to trigger on close
 * - Keyboard: Escape closes, Backdrop click closes
 */

// Helper: get focusable elements within a container
function getFocusable(container) {
  if (!container) return [];
  const selectors = [
    'a[href]',
    'area[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
    '[contenteditable="true"]',
  ];
  return Array.from(container.querySelectorAll(selectors.join(','))).filter(
    (el) => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden')
  );
}

// PUBLIC_INTERFACE
export default function RecipeDetailModal({ open, recipe, onClose }) {
  const closeBtnRef = useRef(null);
  const dialogRef = useRef(null);
  const lastActiveRef = useRef(null);

  // Capture last active element to restore focus after close
  useEffect(() => {
    if (open) {
      lastActiveRef.current = document.activeElement;
    }
  }, [open]);

  // Close on escape key and trap focus within dialog
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose && onClose();
        return;
      }
      if (e.key === 'Tab') {
        const focusables = getFocusable(dialogRef.current);
        if (focusables.length === 0) {
          e.preventDefault();
          return;
        }
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first || !dialogRef.current.contains(document.activeElement)) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last || !dialogRef.current.contains(document.activeElement)) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };
    document.addEventListener('keydown', onKeyDown, true);
    return () => document.removeEventListener('keydown', onKeyDown, true);
  }, [open, onClose]);

  // Initial focus inside dialog
  useEffect(() => {
    if (open) {
      // setTimeout to ensure elements are in DOM
      setTimeout(() => {
        const target = closeBtnRef.current || getFocusable(dialogRef.current)[0];
        target && target.focus();
      }, 0);
    }
  }, [open]);

  // Restore focus when closing
  useEffect(() => {
    if (!open && lastActiveRef.current && lastActiveRef.current.focus) {
      setTimeout(() => {
        try {
          lastActiveRef.current.focus();
        } catch {
          /* ignore */
        }
      }, 0);
    }
  }, [open]);

  if (!open || !recipe) return null;

  const { title, image, time = 0, rating = 0, ingredients = [], steps = [] } = recipe;
  const titleId = 'recipe-modal-title';
  const descId = 'recipe-modal-desc';

  return (
    <div
      className={`modal-backdrop ${open ? 'open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descId}
      onClick={(e) => {
        // click outside to close
        if (e.target === e.currentTarget) onClose && onClose();
      }}
    >
      <div className="modal" role="document" ref={dialogRef}>
        <header className="modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 id={titleId} style={{ margin: 0 }}>{title}</h2>
          <button
            ref={closeBtnRef}
            className="btn ghost"
            onClick={onClose}
            aria-label="Close recipe details"
          >
            Close
          </button>
        </header>

        <div className="modal-body" id={descId}>
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
            <button className="btn" aria-label="Save recipe" title="Save recipe">Save</button>
            <button className="btn ghost" aria-label="Share recipe" title="Share recipe">Share</button>
          </div>
        </footer>
      </div>
    </div>
  );
}
