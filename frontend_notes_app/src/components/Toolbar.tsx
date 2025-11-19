import React from 'react';

type Props = {
  title: string;
  searchValue: string;
  onSearchChange: (v: string) => void;
  onAddNew: () => void;
  sortBy: string;
  onSortChange: (v: string) => void;
  backendEnabled: boolean;
};

const Toolbar = ({
  title,
  searchValue,
  onSearchChange,
  onAddNew,
  sortBy,
  onSortChange,
  backendEnabled
}: Props) => {
  return (
    <div className="toolbar-inner">
      <div className="app-title" aria-label="app-title">{title}</div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <input
          className="input"
          placeholder="Search notes..."
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Search notes"
          data-testid="search-input"
        />
        <select
          className="input"
          value={sortBy}
          aria-label="Sort notes"
          onChange={(e) => onSortChange(e.target.value)}
          title="Sort"
        >
          <option value="updatedAt">Sort: Updated</option>
          <option value="title">Sort: Title</option>
          <option value="pinned">Sort: Pinned first</option>
        </select>
        <button className="btn" onClick={onAddNew} data-testid="add-note-btn">
          + New Note
        </button>
        <span
          title={backendEnabled ? 'Backend mode' : 'Local mode'}
          className="tag"
          aria-label="data-mode"
          style={{ userSelect: 'none' }}
        >
          <span className="badge" style={{ background: backendEnabled ? '#10b981' : '#f59e0b' }} />
          {backendEnabled ? 'Backend' : 'Local'}
        </span>
      </div>
    </div>
  );
};

export default Toolbar;
