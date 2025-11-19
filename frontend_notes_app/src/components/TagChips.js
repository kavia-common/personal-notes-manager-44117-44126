import React from 'react';

const TagChips = ({ tags }) => {
  if (!tags || tags.length === 0) return null;
  return (
    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
      {tags.map((t) => (
        <span key={t} className="tag">#{t}</span>
      ))}
    </div>
  );
};

export default TagChips;
