const base =
  process.env.REACT_APP_BACKEND_URL ||
  process.env.REACT_APP_API_BASE ||
  '';

function safeFetch(path, options) {
  const url = `${base}${path}`;
  return fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options && options.headers),
    },
  });
}

export const apiClient = base
  ? {
      async listNotes() {
        const res = await safeFetch('/notes');
        if (!res.ok) throw new Error('List failed');
        return res.json();
      },
      async getNote(id) {
        const res = await safeFetch(`/notes/${id}`);
        if (!res.ok) throw new Error('Get failed');
        return res.json();
      },
      async createNote(n) {
        const res = await safeFetch('/notes', { method: 'POST', body: JSON.stringify(n) });
        if (!res.ok) throw new Error('Create failed');
        return res.json();
      },
      async updateNote(id, n) {
        const res = await safeFetch(`/notes/${id}`, { method: 'PUT', body: JSON.stringify(n) });
        if (!res.ok) throw new Error('Update failed');
        return res.json();
      },
      async deleteNote(id) {
        const res = await safeFetch(`/notes/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Delete failed');
      },
    }
  : null;
