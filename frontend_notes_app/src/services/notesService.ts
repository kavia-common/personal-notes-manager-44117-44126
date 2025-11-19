import { useCallback, useMemo, useState } from 'react';
import { getItem, setItemDebounced } from '../utils/storage';
import { uuid } from '../utils/uuid';
import { apiClient } from './optionalApiClient';

export type Note = {
  id: string;
  title: string;
  content?: string;
  tags: string[];
  color?: string;
  pinned: boolean;
  updatedAt: number;
  createdAt: number;
};

const STORAGE_KEY = 'notes_app:v1:notes';

// PUBLIC_INTERFACE
export function useNotesService() {
  /** Provides notes state and CRUD operations. Uses localStorage if no backend or if backend fails. */
  const [notes, setNotes] = useState<Note[]>([]);
  const backendEnabled = useMemo(() => !!apiClient, []);

  const loadNotes = useCallback(async () => {
    if (backendEnabled && apiClient) {
      try {
        const list = await apiClient.listNotes();
        setNotes(list);
        return;
      } catch {
        // fall back silently
      }
    }
    const local = getItem<Note[]>(STORAGE_KEY) || [];
    setNotes(local);
  }, [backendEnabled]);

  const persist = useCallback((data: Note[]) => {
    setNotes(data);
    setItemDebounced(STORAGE_KEY, data);
  }, []);

  const seedIfEmpty = useCallback(() => {
    setNotes((curr) => {
      if (curr && curr.length > 0) return curr;
      const demo: Note[] = [
        {
          id: uuid(),
          title: 'Welcome to Personal Notes',
          content:
            'This is a demo note. Use the New Note button to create more. Try pinning, tagging, and filtering.',
          tags: ['demo', 'welcome'],
          color: '#2563EB',
          pinned: true,
          createdAt: Date.now() - 1000 * 60 * 60 * 8,
          updatedAt: Date.now() - 1000 * 60 * 45,
        },
        {
          id: uuid(),
          title: 'Ideas',
          content: '- Build a notes app\n- Add markdown support\n- Sync to the cloud',
          tags: ['ideas'],
          color: '#F59E0B',
          pinned: false,
          createdAt: Date.now() - 1000 * 60 * 60 * 24,
          updatedAt: Date.now() - 1000 * 60 * 60 * 2,
        },
      ];
      setItemDebounced(STORAGE_KEY, demo);
      return demo;
    });
  }, []);

  const createNote = useCallback(async (partial: Omit<Partial<Note>, 'id'>) => {
    const n: Note = {
      id: uuid(),
      title: partial.title || 'Untitled',
      content: partial.content || '',
      tags: partial.tags || [],
      color: partial.color,
      pinned: !!partial.pinned,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    if (backendEnabled && apiClient) {
      try {
        const created = await apiClient.createNote(n);
        persist([created, ...notes]);
        return created;
      } catch {
        // soft fallback
      }
    }
    const next = [n, ...notes];
    persist(next);
    return n;
  }, [notes, backendEnabled, persist]);

  const updateNote = useCallback(async (id: string, changes: Partial<Note>) => {
    const current = notes.find((n) => n.id === id);
    if (!current) return;
    const updated: Note = { ...current, ...changes, updatedAt: Date.now() };
    if (backendEnabled && apiClient) {
      try {
        const saved = await apiClient.updateNote(id, updated);
        const next = notes.map((n) => (n.id === id ? saved : n));
        persist(next);
        return saved;
      } catch {
        // soft fallback
      }
    }
    const next = notes.map((n) => (n.id === id ? updated : n));
    persist(next);
    return updated;
  }, [notes, backendEnabled, persist]);

  const deleteNote = useCallback(async (id: string) => {
    if (backendEnabled && apiClient) {
      try {
        await apiClient.deleteNote(id);
        const next = notes.filter((n) => n.id !== id);
        persist(next);
        return;
      } catch {
        // soft fallback
      }
    }
    const next = notes.filter((n) => n.id !== id);
    persist(next);
  }, [notes, backendEnabled, persist]);

  return {
    notes,
    loadNotes,
    createNote,
    updateNote,
    deleteNote,
    backendEnabled,
    seedIfEmpty
  };
}
