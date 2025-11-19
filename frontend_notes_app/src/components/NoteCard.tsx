import React, { useState } from 'react';
import { formatDistanceToNow } from '../utils/time';
import type { Note } from './NotesList';

type Props = {
  note: Note;
  onEdit: () => void;
  onDelete: () => void;
};

const NoteCard = ({ note, onEdit, onDelete }: Props) => {
  const [confirm, setConfirm] = useState(false);
  const color = note.color || '#2563EB';
  const preview =
    (note.content || '')
      .replace(/\n+/g, ' ')
      .slice(0, 160);

  return (
    <article className="card" style={{ borderTop: `4px solid ${color}` }} data-testid="note-card">
      <div className="meta" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span title={new Date(note.updatedAt).toLocaleString()}>
          {note.pinned ? '📌 ' : ''}Updated {formatDistanceToNow(note.updatedAt)} ago
        </span>
        <div style={{ display: 'flex', gap: 6 }}>
          {(note.tags || []).slice(0, 3).map((t) => (
            <span key={t} className="tag">#{t}</span>
          ))}
        </div>
      </div>
      <h3 className="title" title={note.title}>{note.title || 'Untitled'}</h3>
      {preview && <p style={{ marginTop: 6, color: '#374151' }}>{preview}{preview.length >= 160 ? '…' : ''}</p>}

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 12 }}>
        {!confirm ? (
          <>
            <button className="btn ghost" onClick={() => setConfirm(true)} aria-label="Delete note">Delete</button>
            <button className="btn" onClick={onEdit} aria-label="Edit note">Edit</button>
          </>
        ) : (
          <>
            <span style={{ alignSelf: 'center', color: '#6b7280' }}>Confirm delete?</span>
            <button className="btn ghost" onClick={() => setConfirm(false)}>Cancel</button>
            <button className="btn" style={{ background: '#EF4444' }} onClick={onDelete} data-testid="delete-confirm">Delete</button>
          </>
        )}
      </div>
    </article>
  );
};

export default NoteCard;
