import React, { useEffect, useMemo, useRef, useState } from 'react';
import TagChips from './TagChips';
import ColorPicker from './ColorPicker';
import { uuid } from '../utils/uuid';

type NoteShape = {
  id?: string;
  title: string;
  content?: string;
  tags: string[];
  color?: string;
  pinned: boolean;
  updatedAt?: number;
  createdAt?: number;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (note: NoteShape) => void | Promise<void>;
  note: NoteShape | null;
};

const defaultColors = ['#2563EB', '#F59E0B', '#10B981', '#EF4444', '#8B5CF6', '#111827'];

const NoteEditor = ({ isOpen, onClose, onSave, note }: Props) => {
  const [data, setData] = useState<NoteShape>({
    title: '',
    content: '',
    tags: [],
    color: defaultColors[0],
    pinned: false
  });

  const titleRef = useRef<HTMLInputElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setData(note ? { ...note } : {
        title: '',
        content: '',
        tags: [],
        color: defaultColors[0],
        pinned: false
      });
      // focus title when open
      setTimeout(() => titleRef.current?.focus(), 0);
    }
  }, [isOpen, note]);

  // focus trap + esc
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        handleSave();
      }
      if (document.activeElement === titleRef.current && e.key === 'Enter') {
        e.preventDefault();
        handleSave();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, data]);

  const handleBackdrop = (e: React.MouseEvent) => {
    if (e.target === modalRef.current) onClose();
  };

  const handleSave = () => {
    const payload: NoteShape = {
      ...data,
    };
    if (!payload.id) {
      payload.id = uuid();
      payload.createdAt = Date.now();
    }
    payload.updatedAt = Date.now();
    onSave(payload);
  };

  const setTagString = (val: string) => {
    const arr = val.split(',').map(t => t.trim()).filter(Boolean);
    setData((d) => ({ ...d, tags: Array.from(new Set(arr)) }));
  };

  const tagsString = useMemo(() => data.tags.join(', '), [data.tags]);

  if (!isOpen) return null;
  return (
    <div className="modal-backdrop" ref={modalRef} onMouseDown={handleBackdrop} aria-modal="true" role="dialog" aria-label="Note editor">
      <div className="modal" onMouseDown={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ fontWeight: 700 }}>Note Editor</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn ghost" onClick={onClose}>Close</button>
            <button className="btn" onClick={handleSave} data-testid="editor-save-btn">Save</button>
          </div>
        </div>
        <div className="modal-body">
          <div className="field">
            <label htmlFor="title">Title</label>
            <input
              ref={titleRef}
              id="title"
              className="input"
              placeholder="Title"
              value={data.title}
              onChange={(e) => setData((d) => ({ ...d, title: e.target.value }))}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              className="input textarea"
              placeholder="Write your note here..."
              value={data.content}
              onChange={(e) => setData((d) => ({ ...d, content: e.target.value }))}
            />
          </div>

          <div className="field">
            <label htmlFor="tags">Tags (comma separated)</label>
            <input
              id="tags"
              className="input"
              placeholder="e.g., work, ideas"
              value={tagsString}
              onChange={(e) => setTagString(e.target.value)}
            />
            <TagChips tags={data.tags} />
          </div>

          <div className="field">
            <label>Color</label>
            <ColorPicker
              colors={defaultColors}
              value={data.color || defaultColors[0]}
              onChange={(c) => setData((d) => ({ ...d, color: c }))}
            />
          </div>

          <div className="field" style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <input
              type="checkbox"
              id="pinned"
              checked={!!data.pinned}
              onChange={(e) => setData((d) => ({ ...d, pinned: e.target.checked }))}
            />
            <label htmlFor="pinned">Pinned</label>
          </div>
        </div>
        <div className="modal-actions">
          <button className="btn ghost" onClick={onClose}>Cancel</button>
          <button className="btn" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default NoteEditor;
