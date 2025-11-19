import React from 'react';
import NoteCard from './NoteCard';

/**
 * @typedef {Object} Note
 * @property {string} id
 * @property {string} title
 * @property {string=} content
 * @property {string[]} tags
 * @property {string=} color
 * @property {boolean} pinned
 * @property {number} updatedAt
 * @property {number} createdAt
 */

const NotesList = ({ notes, onEdit, onDelete }) => {
  if (!notes || notes.length === 0) {
    return (
      <div className="empty" data-testid="notes-empty">
        No notes yet. Click "New Note" to get started.
      </div>
    );
  }
  return (
    <div className="card-grid" data-testid="notes-list">
      {notes.map((n) => (
        <NoteCard key={n.id} note={n} onEdit={() => onEdit(n)} onDelete={() => onDelete(n.id)} />
      ))}
    </div>
  );
};

export default NotesList;
