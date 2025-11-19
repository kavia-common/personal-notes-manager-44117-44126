import React from 'react';
import Toolbar from './Toolbar';
import Sidebar from './Sidebar';

/**
 * PUBLIC_INTERFACE
 * App shell providing top toolbar, optional left sidebar, and main content area.
 */
export default function AppShell({
  title,
  searchValue,
  onSearchChange,
  onAddNew,
  children,
  sortBy,
  onSortChange,
  tagFilter,
  onTagFilterChange,
  tags,
  backendEnabled
}) {
  return (
    <div>
      <div className="toolbar">
        <div className="container">
          <Toolbar
            title={title}
            searchValue={searchValue}
            onSearchChange={onSearchChange}
            onAddNew={onAddNew}
            sortBy={sortBy}
            onSortChange={onSortChange}
            backendEnabled={backendEnabled}
          />
        </div>
      </div>
      <div className="container">
        <div className="layout">
          <Sidebar
            tags={tags}
            activeTag={tagFilter}
            onChangeTag={onTagFilterChange}
          />
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
}
