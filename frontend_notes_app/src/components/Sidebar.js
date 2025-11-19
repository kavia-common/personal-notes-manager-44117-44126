import React from 'react';

const Sidebar = ({ tags, activeTag, onChangeTag }) => {
  return (
    <aside className="sidebar" aria-label="sidebar">
      <div style={{ fontWeight: 700, marginBottom: 8 }}>Tags</div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        <button
          className="btn ghost"
          aria-pressed={activeTag === ''}
          onClick={() => onChangeTag('')}
        >
          All
        </button>
        {(!tags || tags.length === 0) && <span style={{ color: '#6b7280' }}>No tags</span>}
        {tags && tags.map((t) => (
          <button
            key={t}
            className="btn ghost"
            aria-pressed={activeTag === t}
            onClick={() => onChangeTag(t)}
          >
            #{t}
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
