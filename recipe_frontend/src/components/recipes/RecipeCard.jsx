import React from 'react';
import Badge from '../common/Badge';
import clockIcon from '../../assets/icons/clock.svg';
import starIcon from '../../assets/icons/star.svg';
import bookmarkIcon from '../../assets/icons/bookmark.svg';
import shareIcon from '../../assets/icons/share.svg';
import placeholderImg from '../../assets/placeholder.png';

/**
 * RecipeCard: displays recipe summary with image, title, rating, time, and actions.
 */

// PUBLIC_INTERFACE
export default function RecipeCard({ item, onSelect }) {
  if (!item) return null;

  const { title, image, rating = 0, time = 0 } = item;

  // Build star rating visually using icon and screen-reader text
  const rounded = Math.round(rating);
  const srText = `Rating ${rating} out of 5`;

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
        title={`Open details for ${title}`}
      >
        <div style={{ position: 'relative', aspectRatio: '16/9', background: '#eef2ff' }}>
          <img
            src={image || placeholderImg}
            alt={title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            onError={(e) => {
              e.currentTarget.src = placeholderImg;
            }}
          />
          <div style={{ position: 'absolute', top: 12, left: 12 }}>
            <Badge variant="secondary" title="Estimated time">
              <img src={clockIcon} width={16} height={16} alt="" aria-hidden="true" style={{ marginRight: 6 }} />
              {time} min
            </Badge>
          </div>
        </div>
        <div style={{ padding: '16px 20px' }}>
          <h3 style={{ marginBottom: 6 }}>{title}</h3>
          <div className="text-muted" style={{ fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
            <span aria-label={srText} title={srText} style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <img
                  key={i}
                  src={starIcon}
                  alt=""
                  aria-hidden="true"
                  width={14}
                  height={14}
                  style={{ opacity: i < rounded ? 1 : 0.25 }}
                />
              ))}
            </span>
            <span style={{ marginLeft: 4, fontWeight: 700 }}>
              {Number.isFinite(rating) && rating.toFixed ? rating.toFixed(1) : rating}
            </span>
          </div>
        </div>
      </button>

      <div
        className="modal-footer"
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <div className="text-muted" style={{ fontSize: 12 }}>Actions</div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn ghost" aria-label="Save recipe" title="Save recipe">
            <img src={bookmarkIcon} width={16} height={16} alt="" aria-hidden="true" />
            <span className="visually-hidden">Save</span>
          </button>
          <button className="btn ghost" aria-label="Share recipe" title="Share recipe">
            <img src={shareIcon} width={16} height={16} alt="" aria-hidden="true" />
            <span className="visually-hidden">Share</span>
          </button>
        </div>
      </div>
    </article>
  );
}
