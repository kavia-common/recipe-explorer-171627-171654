import React from 'react';
import Badge from '../common/Badge';

/**
 * RecipeCard: displays recipe summary with image, title, rating, time, and actions.
 */

// PUBLIC_INTERFACE
export default function RecipeCard({ item, onSelect }) {
  if (!item) return null;

  const { title, image, rating = 0, time = 0 } = item;

  const stars = Array.from({ length: 5 }, (_, i) => (i < Math.round(rating) ? '★' : '☆')).join('');

  return (
    <article className="card transition-base" style={{ padding: 0, overflow: 'hidden' }}>
      <button
        onClick={() => onSelect && onSelect(item)}
        className="transition-base"
        style={{
          display: 'block',
          width: '100%',
          textAlign: 'left',
          border: 'none',
          background: 'transparent',
          cursor: 'pointer',
        }}
        aria-label={`Open details for ${title}`}
      >
        <div style={{ position: 'relative', aspectRatio: '16/9', background: '#eef2ff' }}>
          {image ? (
            <img
              src={image}
              alt={title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          ) : (
            <div
              aria-hidden="true"
              style={{
                width: '100%',
                height: '100%',
                display: 'grid',
                placeItems: 'center',
                color: 'var(--color-muted)',
                fontSize: 32,
              }}
            >
              🍲
            </div>
          )}
          <div style={{ position: 'absolute', top: 12, left: 12 }}>
            <Badge variant="secondary" title="Estimated time">
              ⏱ {time} min
            </Badge>
          </div>
        </div>
        <div style={{ padding: '16px 20px' }}>
          <h3 style={{ marginBottom: 6 }}>{title}</h3>
          <div className="text-muted" style={{ fontSize: 13 }}>
            <span aria-label={`Rating ${rating} out of 5`}>{stars}</span>
            <span style={{ marginLeft: 8, fontWeight: 700 }}>{rating.toFixed ? rating.toFixed(1) : rating}</span>
          </div>
        </div>
      </button>

      <div
        className="modal-footer"
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <div className="text-muted" style={{ fontSize: 12 }}>Actions</div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn ghost" aria-label="Save recipe">Save</button>
          <button className="btn ghost" aria-label="Share recipe">Share</button>
        </div>
      </div>
    </article>
  );
}
