type Note = {
  id: string;
  title: string;
  content?: string;
  tags: string[];
  color?: string;
  pinned: boolean;
  updatedAt: number;
  createdAt: number;
};

const base =
  process.env.REACT_APP_BACKEND_URL ||
  process.env.REACT_APP_API_BASE ||
  '';

function safeFetch(path: string, options?: RequestInit) {
  const url = `${base}${path}`;
  return fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options && options.headers),
    },
  });
}

export const apiClient: null | {
  listNotes: () => Promise<Note[]>;
  getNote: (id: string) => Promise<Note>;
  createNote: (n: Note) => Promise<Note>;
  updateNote: (id: string, n: Note) => Promise<Note>;
  deleteNote: (id: string) => Promise<void>;
} = base
  ? {
      async listNotes() {
        const res = await safeFetch('/notes');
        if (!res.ok) throw new Error('List failed');
        return res.json();
      },
      async getNote(id: string) {
        const res = await safeFetch(`/notes/${id}`);
        if (!res.ok) throw new Error('Get failed');
        return res.json();
      },
      async createNote(n: Note) {
        const res = await safeFetch('/notes', { method: 'POST', body: JSON.stringify(n) });
        if (!res.ok) throw new Error('Create failed');
        return res.json();
      },
      async updateNote(id: string, n: Note) {
        const res = await safeFetch(`/notes/${id}`, { method: 'PUT', body: JSON.stringify(n) });
        if (!res.ok) throw new Error('Update failed');
        return res.json();
      },
      async deleteNote(id: string) {
        const res = await safeFetch(`/notes/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Delete failed');
      },
    }
  : null;
