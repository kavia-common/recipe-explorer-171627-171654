import React from 'react';

/**
 * SrOnly: Utility wrapper to visually hide content but keep it accessible to screen readers.
 * Useful for providing additional context without affecting layout.
 */

// PUBLIC_INTERFACE
export default function SrOnly({ as: Tag = 'span', children }) {
  /** Renders children within a visually hidden element preserved for assistive tech. */
  const style = {
    position: 'absolute',
    height: 1,
    width: 1,
    overflow: 'hidden',
    clip: 'rect(1px, 1px, 1px, 1px)',
    whiteSpace: 'nowrap',
    border: 0,
    padding: 0,
    margin: -1,
  };
  return <Tag style={style} className="visually-hidden">{children}</Tag>;
}
