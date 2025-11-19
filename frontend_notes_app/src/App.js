import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import './theme/theme.css';
import AppShell from './components/AppShell';
import NotesList from './components/NotesList';
import NoteEditor from './components/NoteEditor';
import { useNotesService } from './services/notesService';
import { debounce } from './utils/storage';

// PUBLIC_INTERFACE
function App() {
  /** This is the main entry for the Notes app. It wires AppShell, NotesList, and NoteEditor, and applies Ocean Professional theme. */
  const {
    notes,
    loadNotes,
    createNote,
    updateNote,
    deleteNote,
    backendEnabled,
    seedIfEmpty,
  } = useNotesService();

  const [query, setQuery] = useState('');
  const [tagFilter, setTagFilter] = useState('');
  const [sortBy, setSortBy] = useState('updatedAt'); // 'updatedAt' | 'title' | 'pinned'
  const [editorOpen, setEditorOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [toast, setToast] = useState(null);

  // apply theme root attribute for Ocean Professional
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'ocean-professional');
  }, []);

  useEffect(() => {
    loadNotes().then(() => seedIfEmpty());
    // eslint-disable-next-line
  }, []);

  const openCreate = () => {
    setEditing(null);
    setEditorOpen(true);
  };

  const openEdit = (note) => {
    setEditing(note);
    setEditorOpen(true);
  };

  const closeEditor = () => setEditorOpen(false);

  const onSave = async (note) => {
    try {
      if (note.id) {
        await updateNote(note.id, note);
        setToast({ type: 'success', message: 'Saved changes' });
      } else {
        await createNote(note);
        setToast({ type: 'success', message: 'Created note' });
      }
      setEditorOpen(false);
    } catch (e) {
      setToast({ type: 'error', message: 'Save failed. Using local storage.' });
    }
  };

  const onDelete = async (id) => {
    try {
      await deleteNote(id);
      setToast({ type: 'success', message: 'Deleted note' });
    } catch (e) {
      setToast({ type: 'error', message: 'Delete failed' });
    }
  };

  const clearToast = useMemo(() => debounce(() => setToast(null), 2000), []);

  useEffect(() => {
    if (toast) {
      clearToast();
    }
  }, [toast, clearToast]);

  const filtered = useMemo(() => {
    let list = [...notes];
    if (query) {
      const q = query.toLowerCase();
      list = list.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          (n.content || '').toLowerCase().includes(q)
      );
    }
    if (tagFilter) {
      list = list.filter((n) => (n.tags || []).includes(tagFilter));
    }
    // pinned first always visually; sort key affects order within groups
    const byKey = (a, b, key, dir = 'desc') => {
      const av = a[key] || '';
      const bv = b[key] || '';
      if (av < bv) return dir === 'asc' ? -1 : 1;
      if (av > bv) return dir === 'asc' ? 1 : -1;
      return 0;
    };
    list.sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      if (sortBy === 'title') return byKey(a, b, 'title', 'asc');
      if (sortBy === 'pinned') {
        // already grouped; within group use updatedAt desc
        return byKey(a, b, 'updatedAt', 'desc');
      }
      return byKey(a, b, 'updatedAt', 'desc');
    });
    return list;
  }, [notes, query, tagFilter, sortBy]);

  const uniqueTags = useMemo(() => {
    const s = new Set();
    notes.forEach((n) => (n.tags || []).forEach((t) => s.add(t)));
    return Array.from(s).sort();
  }, [notes]);

  return (
    <AppShell
      title="Personal Notes"
      searchValue={query}
      onSearchChange={setQuery}
      onAddNew={openCreate}
      sortBy={sortBy}
      onSortChange={setSortBy}
      tagFilter={tagFilter}
      onTagFilterChange={setTagFilter}
      tags={uniqueTags}
      backendEnabled={backendEnabled}
    >
      <div className="content-area">
        <NotesList
          notes={filtered}
          onEdit={openEdit}
          onDelete={onDelete}
        />
      </div>

      <NoteEditor
        isOpen={editorOpen}
        onClose={closeEditor}
        onSave={onSave}
        note={editing}
      />

      {toast && (
        <div
          role="status"
          className={`toast ${toast.type}`}
          aria-live="polite"
        >
          {toast.message}
        </div>
      )}
    </AppShell>
  );
}

export default App;
