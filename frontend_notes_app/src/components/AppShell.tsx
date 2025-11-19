import React from 'react';
import Toolbar from './Toolbar';
import Sidebar from './Sidebar';

type Props = {
  title: string;
  searchValue: string;
  onSearchChange: (v: string) => void;
  onAddNew: () => void;
  children: React.ReactNode;
  sortBy: string;
  onSortChange: (v: string) => void;
  tagFilter: string;
  onTagFilterChange: (v: string) => void;
  tags: string[];
  backendEnabled: boolean;
};

// PUBLIC_INTERFACE
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
}: Props) {
  /** App shell providing top toolbar, optional left sidebar, and main content area. */
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
