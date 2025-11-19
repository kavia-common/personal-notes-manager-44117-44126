import React from 'react';
import NoteCard from './NoteCard';

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

type Props = {
  notes: Note[];
  onEdit: (n: Note) => void;
  onDelete: (id: string) => void;
};

const NotesList = ({ notes, onEdit, onDelete }: Props) => {
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
